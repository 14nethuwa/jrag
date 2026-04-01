const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const TEST_FRAMES = [
  'frame-0001.jpg', // Opening frame
  'frame-0500.jpg', // Mid-sequence
  'frame-1000.jpg', // Mid-late
  'frame-1500.jpg', // Near end
  'frame-1746.jpg', // Final frame
];

const QUALITY_LEVELS = [75, 78, 82, 85, 90];

async function testCompression() {
  const outputDir = './test-compression-output';
  await fs.mkdir(outputDir, { recursive: true });
  
  console.log('🎬 JRAG Scrollytelling Compression Test\n');
  console.log('Testing grain-masked compression quality...\n');
  
  const results = [];
  
  for (const frame of TEST_FRAMES) {
    const inputPath = `./public/videos/scrollytelling-frames/${frame}`;
    
    console.log(`\n📸 ${frame}`);
    console.log('─'.repeat(60));
    
    // Get original size
    const originalStats = await fs.stat(inputPath);
    const originalKB = Math.round(originalStats.size / 1024);
    console.log(`   Original (JPG): ${originalKB} KB`);
    
    const frameResults = { frame, original: originalKB, webp: {}, avif: {} };
    
    for (const quality of QUALITY_LEVELS) {
      // WebP
      const webpOutput = `${outputDir}/${frame.replace('.jpg', '')}-q${quality}.webp`;
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(webpOutput);
      
      const webpStats = await fs.stat(webpOutput);
      const webpKB = Math.round(webpStats.size / 1024);
      const webpReduction = Math.round((1 - webpStats.size / originalStats.size) * 100);
      frameResults.webp[quality] = { size: webpKB, reduction: webpReduction };
      
      console.log(`   WebP q${quality}: ${webpKB} KB (${webpReduction}% smaller)`);
      
      // AVIF (adjusted quality range for equivalent perception)
      const avifQuality = Math.round(quality * 0.85);
      const avifOutput = `${outputDir}/${frame.replace('.jpg', '')}-q${avifQuality}-avif.avif`;
      await sharp(inputPath)
        .avif({ quality: avifQuality, effort: 6 })
        .toFile(avifOutput);
      
      const avifStats = await fs.stat(avifOutput);
      const avifKB = Math.round(avifStats.size / 1024);
      const avifReduction = Math.round((1 - avifStats.size / originalStats.size) * 100);
      frameResults.avif[avifQuality] = { size: avifKB, reduction: avifReduction };
      
      console.log(`   AVIF q${avifQuality}: ${avifKB} KB (${avifReduction}% smaller)`);
    }
    
    results.push(frameResults);
  }
  
  // Summary
  console.log('\n\n📊 COMPRESSION SUMMARY');
  console.log('═'.repeat(60));
  
  const avgReductions = { webp: {}, avif: {} };
  
  for (const quality of QUALITY_LEVELS) {
    const webpAvg = Math.round(
      results.reduce((sum, r) => sum + r.webp[quality].reduction, 0) / results.length
    );
    avgReductions.webp[quality] = webpAvg;
    
    const avifQuality = Math.round(quality * 0.85);
    const avifAvg = Math.round(
      results.reduce((sum, r) => sum + r.avif[avifQuality].reduction, 0) / results.length
    );
    avgReductions.avif[avifQuality] = avifAvg;
  }
  
  console.log('\nAverage Reduction by Format & Quality:');
  console.log('─'.repeat(60));
  
  for (const quality of QUALITY_LEVELS) {
    const avifQuality = Math.round(quality * 0.85);
    console.log(`  q${quality} → WebP: ${avgReductions.webp[quality]}% | AVIF q${avifQuality}: ${avgReductions.avif[avifQuality]}%`);
  }
  
  // Projected savings for full 1746 frames
  console.log('\n\n💾 PROJECTED SAVINGS (1,746 frames at 700 MB)');
  console.log('═'.repeat(60));
  
  for (const quality of QUALITY_LEVELS) {
    const webpProjected = Math.round(700 * (1 - avgReductions.webp[quality] / 100));
    const webpSaved = 700 - webpProjected;
    
    const avifQuality = Math.round(quality * 0.85);
    const avifProjected = Math.round(700 * (1 - avgReductions.avif[avifQuality] / 100));
    const avifSaved = 700 - avifProjected;
    
    console.log(`\n  Quality ${quality}:`);
    console.log(`    WebP → ${webpProjected} MB (saves ${webpSaved} MB)`);
    console.log(`    AVIF q${avifQuality} → ${avifProjected} MB (saves ${avifSaved} MB)`);
  }
  
  console.log('\n\n✨ RECOMMENDATION');
  console.log('═'.repeat(60));
  console.log('With 15% grain overlay masking artifacts:');
  console.log('  • WebP q78 = ~70% reduction, fast decode');
  console.log('  • WebP q75 = ~75% reduction, test for artifacts');
  console.log('  • AVIF q66 = ~75% reduction, slower decode');
  console.log('\n📁 Test files saved to: ./test-compression-output/');
  console.log('🌐 Next: Open test-grain-viewer.html to visually compare');
  console.log('    with grain overlay before choosing quality level.\n');
}

testCompression().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
