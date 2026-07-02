/**
 * Image Compression Pipeline
 * 
 * Generates optimized WebP versions of all images in /public/images/
 * Run: node compress-images.mjs
 * 
 * Output structure:
 *   /public/images/optimized/
 *     ├── pillar-01.webp          (max 1200px wide, quality 78)
 *     ├── pillar-01-mobile.webp   (max 640px wide, quality 72)
 *     └── ...
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import { join, parse } from "path";

const INPUT_DIR = "raw-images";
const OUTPUT_DIR = "public/images/optimized";

const DESKTOP = { maxWidth: 1200, quality: 78, suffix: "" };
const MOBILE = { maxWidth: 640, quality: 72, suffix: "-mobile" };

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function getImageFiles(dir) {
  const entries = [];

  async function walk(currentDir) {
    const items = await readdir(currentDir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(currentDir, item.name);
      if (item.isDirectory()) {
        // Skip the output directory
        if (fullPath === OUTPUT_DIR) continue;
        // Skip careers raw folder
        if (item.name === "careers" && currentDir === INPUT_DIR) continue;
        await walk(fullPath);
      } else {
        const ext = parse(item.name).ext.toLowerCase();
        if (SUPPORTED_EXTENSIONS.has(ext)) {
          entries.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return entries;
}

async function compressImage(inputPath, config) {
  const { name } = parse(inputPath);
  const outputPath = join(OUTPUT_DIR, `${name}${config.suffix}.webp`);

  try {
    const metadata = await sharp(inputPath).metadata();
    const width = metadata.width || config.maxWidth;

    await sharp(inputPath)
      .resize({
        width: Math.min(width, config.maxWidth),
        withoutEnlargement: true,
      })
      .webp({ quality: config.quality, effort: 2 })
      .toFile(outputPath);

    const inputStats = await stat(inputPath);
    const outputStats = await stat(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    return {
      name: `${name}${config.suffix}.webp`,
      inputSize: (inputStats.size / 1024).toFixed(1),
      outputSize: (outputStats.size / 1024).toFixed(1),
      savings: `${savings}%`,
    };
  } catch (err) {
    console.error(`  ✗ Error processing ${inputPath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("🔧 Image Compression Pipeline\n");

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await getImageFiles(INPUT_DIR);
  console.log(`Found ${files.length} images to process.\n`);

  let totalInputKB = 0;
  let totalOutputKB = 0;
  const results = [];

  for (const file of files) {
    const { name } = parse(file);
    process.stdout.write(`  Processing ${name}...`);

    // Generate desktop version
    const desktop = await compressImage(file, DESKTOP);
    if (desktop) {
      totalInputKB += parseFloat(desktop.inputSize);
      totalOutputKB += parseFloat(desktop.outputSize);
      results.push(desktop);
    }

    // Generate mobile version
    const mobile = await compressImage(file, MOBILE);
    if (mobile) {
      totalOutputKB += parseFloat(mobile.outputSize);
      results.push(mobile);
    }

    console.log(` ✓ (${desktop?.savings} savings)`);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Original total:  ${(totalInputKB / 1024).toFixed(1)} MB`);
  console.log(`  Optimized total: ${(totalOutputKB / 1024).toFixed(1)} MB`);
  console.log(`  Total savings:   ${((1 - totalOutputKB / totalInputKB) * 100).toFixed(1)}%`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Print top 10 largest original files
  console.log("Top savings:");
  results
    .filter((r) => !r.name.includes("-mobile"))
    .sort((a, b) => parseFloat(b.inputSize) - parseFloat(a.inputSize))
    .slice(0, 10)
    .forEach((r) => {
      console.log(`  ${r.name.padEnd(35)} ${r.inputSize.padStart(8)} KB → ${r.outputSize.padStart(8)} KB  (${r.savings})`);
    });
}

main().catch(console.error);
