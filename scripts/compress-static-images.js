const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES = [
  { path: './public/images/element.png', quality: 78 },
  { path: './public/images/parallax/cloud1.png', quality: 75 },
  { path: './public/images/parallax/cloud2.png', quality: 75 },
  { path: './public/images/parallax/cloud3.png', quality: 75 },
  { path: './public/images/parallax/mountBg.png', quality: 78 },
  { path: './public/images/parallax/mountFg.png', quality: 78 },
  { path: './public/images/parallax/mountMg.png', quality: 78 },
  { path: './public/images/parallax/waterEdge.png', quality: 78 },
];

async function compressStaticImages() {
  console.log('🖼️  JRAG Static Image Compression\n');
  console.log('Converting PNG files to AVIF...\n');
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  const results = [];
  
  for (const img of IMAGES) {
    try {
      const parsed = path.parse(img.path);
      const outputPath = path.join(parsed.dir, `${parsed.name}.avif`);
      
      // Get original size
      const originalStats = await fs.stat(img.path);
      const originalKB = Math.round(originalStats.size / 1024);
      totalOriginalSize += originalStats.size;
      
      // Compress to AVIF
      console.log(`  Processing: ${parsed.base}`);
      await sharp(img.path)
        .avif({ quality: img.quality, effort: 6 })
        .toFile(outputPath);
      
      // Get compressed size
      const compressedStats = await fs.stat(outputPath);
      const compressedKB = Math.round(compressedStats.size / 1024);
      totalCompressedSize += compressedStats.size;
      
      const reduction = Math.round((1 - compressedStats.size / originalStats.size) * 100);
      
      console.log(`    ${originalKB} KB → ${compressedKB} KB (${reduction}% smaller)`);
      console.log(`    ✓ Saved to: ${outputPath}\n`);
      
      results.push({
        file: parsed.base,
        original: originalKB,
        compressed: compressedKB,
        reduction
      });
    } catch (err) {
      console.error(`  ✗ Failed to process ${img.path}: ${err.message}\n`);
    }
  }
  
  // Summary
  const totalReduction = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);
  
  console.log('\n✨ COMPRESSION COMPLETE\n');
  console.log('═'.repeat(60));
  console.log(`  Original size:    ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Compressed size:  ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total reduction:  ${totalReduction}%`);
  console.log(`  Space saved:      ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB`);
  console.log('═'.repeat(60));
  
  console.log('\n📊 Individual Results:\n');
  results.forEach(r => {
    console.log(`  ${r.file.padEnd(25)} ${String(r.original).padStart(8)} KB → ${String(r.compressed).padStart(8)} KB (${r.reduction}%)`);
  });
  
  console.log('\n\nNext steps:');
  console.log('  1. Update component references to use .avif files');
  console.log('  2. Test parallax animations');
  console.log('  3. Verify element reveal animation');
  console.log('  4. Deploy!\n');
}

compressStaticImages().catch(err => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
