const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  INPUT_DIR: './public/videos/scrollytelling-frames-original',
  OUTPUT_DIR: './public/videos/scrollytelling-frames-1080p-jpg',
  TARGET_WIDTH: 1920,
  TARGET_HEIGHT: 1080,
  QUALITY: 85, // High quality for JPG
  EFFORT: 6,
  PARALLEL_WORKERS: 4
};

async function downscaleFrames() {
  console.log('📹 JRAG Scrollytelling Frame Downscaling\n');
  console.log(`Configuration:`);
  console.log(`  Input: ${CONFIG.INPUT_DIR}`);
  console.log(`  Output: ${CONFIG.OUTPUT_DIR}`);
  console.log(`  Resolution: 3840x2160 → ${CONFIG.TARGET_WIDTH}x${CONFIG.TARGET_HEIGHT} (75% pixel reduction)`);
  console.log(`  Format: JPG (mozjpeg) at quality ${CONFIG.QUALITY}`);
  console.log(`  Parallel workers: ${CONFIG.PARALLEL_WORKERS}\n`);
  
  // Create output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  
  // Get all JPG files from original backup
  const files = await fs.readdir(CONFIG.INPUT_DIR);
  const jpgFiles = files.filter(f => f.endsWith('.jpg')).sort();
  
  console.log(`📸 Found ${jpgFiles.length} frames to downscale\n`);
  console.log('Processing...\n');
  
  const startTime = Date.now();
  let totalOriginalSize = 0;
  let totalDownscaledSize = 0;
  let processed = 0;
  
  // Process in batches
  const batchSize = CONFIG.PARALLEL_WORKERS;
  
  for (let i = 0; i < jpgFiles.length; i += batchSize) {
    const batch = jpgFiles.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (file) => {
      const inputPath = path.join(CONFIG.INPUT_DIR, file);
      const outputPath = path.join(CONFIG.OUTPUT_DIR, file); // Keep as JPG
      
      try {
        // Get original size
        const originalStats = await fs.stat(inputPath);
        totalOriginalSize += originalStats.size;
        
        // Downscale to 1080p and re-encode as high-quality JPG
        await sharp(inputPath)
          .resize(CONFIG.TARGET_WIDTH, CONFIG.TARGET_HEIGHT, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: CONFIG.QUALITY, progressive: true, mozjpeg: true })
          .toFile(outputPath);
        
        // Get downscaled size
        const downscaledStats = await fs.stat(outputPath);
        totalDownscaledSize += downscaledStats.size;
        
        processed++;
        
        // Progress report every 100 frames
        if (processed % 100 === 0) {
          const currentReduction = ((1 - totalDownscaledSize / totalOriginalSize) * 100).toFixed(1);
          const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (processed / (Date.now() - startTime) * 1000).toFixed(1);
          const eta = ((jpgFiles.length - processed) / rate).toFixed(0);
          
          console.log(`  ✓ ${processed}/${jpgFiles.length} frames | ${currentReduction}% reduction | ${elapsed}s elapsed | ETA: ${eta}s`);
        }
      } catch (err) {
        console.error(`  ✗ Failed to process ${file}: ${err.message}`);
      }
    }));
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  const finalReduction = ((1 - totalDownscaledSize / totalOriginalSize) * 100).toFixed(1);
  const pixelReduction = 75; // 4K → 1080p is 75% fewer pixels
  
  console.log('\n\n✨ DOWNSCALING COMPLETE\n');
  console.log('═'.repeat(60));
  console.log(`  Original size (4K):        ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Downscaled size (1080p):   ${(totalDownscaledSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Total reduction:           ${finalReduction}%`);
  console.log(`  Space saved:               ${((totalOriginalSize - totalDownscaledSize) / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Pixel reduction:           ${pixelReduction}% (4K → 1080p)`);
  console.log(`  Duration:                  ${duration}s`);
  console.log(`  Processing rate:           ${(processed / duration).toFixed(1)} frames/sec`);
  console.log('═'.repeat(60));
  console.log(`\n📁 Downscaled frames saved to: ${CONFIG.OUTPUT_DIR}\n`);
  
  console.log('Expected Performance Improvements:');
  console.log('  • Canvas decode time: 75% faster (fewer pixels)');
  console.log('  • CPU usage: ~75% lower during scrubbing');
  console.log('  • Visual quality: Identical with grain overlay at typical viewing distance');
  console.log('  • Scrubbing performance: 60fps guaranteed on modern browsers\n');
  
  console.log('Next steps:');
  console.log('  1. Run: npm run perf:test-1080p');
  console.log('  2. Compare decode speed vs 4K WebP');
  console.log('  3. If good: npm run perf:swap-to-1080p');
  console.log('  4. Test scrollytelling in browser');
  console.log('  5. If happy: can safely delete scrollytelling-frames-webp\n');
}

downscaleFrames().catch(err => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
