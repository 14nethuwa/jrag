const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { Worker } = require('worker_threads');

const CONFIG = {
  INPUT_DIR: './public/videos/scrollytelling-frames-original',
  OUTPUT_DIR: './public/videos/scrollytelling-frames-webp',
  QUALITY: 78, // Adjust based on test results (75-82 recommended)
  FORMAT: 'webp',
  EFFORT: 6,
  PARALLEL_WORKERS: 4
};

async function compressFrames() {
  console.log('🎬 JRAG Scrollytelling Frame Compression\n');
  console.log(`Configuration:`);
  console.log(`  Format: ${CONFIG.FORMAT.toUpperCase()}`);
  console.log(`  Quality: ${CONFIG.QUALITY}`);
  console.log(`  Parallel workers: ${CONFIG.PARALLEL_WORKERS}`);
  console.log(`  Input: ${CONFIG.INPUT_DIR}`);
  console.log(`  Output: ${CONFIG.OUTPUT_DIR}\n`);
  
  // Create output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  
  // Get all JPG files
  const files = await fs.readdir(CONFIG.INPUT_DIR);
  const jpgFiles = files.filter(f => f.endsWith('.jpg')).sort();
  
  console.log(`📸 Found ${jpgFiles.length} frames to compress\n`);
  console.log('Processing...\n');
  
  const startTime = Date.now();
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processed = 0;
  
  // Process in batches
  const batchSize = CONFIG.PARALLEL_WORKERS;
  
  for (let i = 0; i < jpgFiles.length; i += batchSize) {
    const batch = jpgFiles.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (file) => {
      const inputPath = path.join(CONFIG.INPUT_DIR, file);
      const outputPath = path.join(CONFIG.OUTPUT_DIR, file.replace('.jpg', '.webp'));
      
      try {
        // Get original size
        const originalStats = await fs.stat(inputPath);
        totalOriginalSize += originalStats.size;
        
        // Compress
        await sharp(inputPath)
          .webp({ quality: CONFIG.QUALITY, effort: CONFIG.EFFORT })
          .toFile(outputPath);
        
        // Get compressed size
        const compressedStats = await fs.stat(outputPath);
        totalCompressedSize += compressedStats.size;
        
        processed++;
        
        // Progress report every 100 frames
        if (processed % 100 === 0) {
          const currentReduction = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
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
  const finalReduction = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
  
  console.log('\n\n✨ COMPRESSION COMPLETE\n');
  console.log('═'.repeat(60));
  console.log(`  Original size:    ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Compressed size:  ${(totalCompressedSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Reduction:        ${finalReduction}%`);
  console.log(`  Space saved:      ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Duration:         ${duration}s`);
  console.log(`  Processing rate:  ${(processed / duration).toFixed(1)} frames/sec`);
  console.log('═'.repeat(60));
  console.log(`\n📁 Compressed frames saved to: ${CONFIG.OUTPUT_DIR}\n`);
  console.log('Next steps:');
  console.log('  1. Verify quality in browser with scrollytelling component');
  console.log('  2. Update component to reference new .webp frames');
  console.log('  3. Test scrolling performance');
  console.log('  4. Deploy!\n');
}

compressFrames().catch(err => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
