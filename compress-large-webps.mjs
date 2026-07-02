import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, parse } from "path";

const TARGET_DIR = "public/images/optimized";
const SIZE_LIMIT_BYTES = 300 * 1024; // 300 KB

const CAREERS_FILES_TO_DELETE = [
  "public/careers/alesia-kazantceva.webp",
  "public/careers/alesia-kazantceva-1.webp",
  "public/careers/luca-bravo.webp",
  "public/careers/ergonofis.webp",
  "public/careers/yibei-geng.webp",
  "public/careers/nrd.webp"
];

async function compressWebP(filePath) {
  const tempPath = filePath + ".tmp";
  try {
    const metadata = await sharp(filePath).metadata();
    const width = metadata.width || 1200;

    await sharp(filePath)
      .resize({
        width: Math.min(width, 1200),
        withoutEnlargement: true,
      })
      .webp({ quality: 75, effort: 4 })
      .toFile(tempPath);

    const oldStats = await stat(filePath);
    const newStats = await stat(tempPath);

    if (newStats.size < oldStats.size) {
      await unlink(filePath);
      await rename(tempPath, filePath);
      const savings = ((1 - newStats.size / oldStats.size) * 100).toFixed(1);
      console.log(`  ✓ Compressed ${parse(filePath).base}: ${(oldStats.size/1024).toFixed(0)}KB -> ${(newStats.size/1024).toFixed(0)}KB (Saved ${savings}%)`);
    } else {
      await unlink(tempPath);
      console.log(`  - Kept original ${parse(filePath).base} (temp file was not smaller)`);
    }
  } catch (err) {
    console.error(`  ✗ Error compressing ${filePath}:`, err.message);
    try { await unlink(tempPath); } catch {}
  }
}

// Custom rename helper using fs promise/copy since standard rename can fail across filesystems or locks
import { copyFile } from "fs/promises";
async function rename(src, dest) {
  await copyFile(src, dest);
  await unlink(src);
}

async function main() {
  console.log("🧹 Running Build Size Optimization Pipeline...\n");

  // 1. Optimize large WebPs in public/images/optimized
  try {
    const files = await readdir(TARGET_DIR);
    console.log(`Scanning ${TARGET_DIR} for large WebP files...`);
    
    for (const file of files) {
      const ext = parse(file).ext.toLowerCase();
      if (ext === ".webp" && !file.includes("-mobile")) {
        const fullPath = join(TARGET_DIR, file);
        const stats = await stat(fullPath);
        
        if (stats.size > SIZE_LIMIT_BYTES) {
          console.log(`Found large file: ${file} (${(stats.size/1024/1024).toFixed(2)} MB)`);
          await compressWebP(fullPath);
        }
      }
    }
  } catch (err) {
    console.error("Error reading optimized directory:", err.message);
  }

  // 2. Clean up unoptimized careers files
  console.log("\nCleaning up unoptimized raw careers images...");
  for (const path of CAREERS_FILES_TO_DELETE) {
    try {
      const stats = await stat(path);
      await unlink(path);
      console.log(`  ✓ Deleted: ${path} (${(stats.size/1024/1024).toFixed(2)} MB)`);
    } catch (err) {
      // File already deleted or does not exist
      console.log(`  - Already clean: ${path}`);
    }
  }

  console.log("\n🎉 Optimization complete!");
}

main();
