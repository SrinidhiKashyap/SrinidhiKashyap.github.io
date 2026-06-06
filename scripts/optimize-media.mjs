import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const root = process.cwd();
const backupRoot = path.join(root, "media-originals-backup");

const imageJobs = [
  {
    src: "public/assets/work-sterkros-detail/wall-advertisement.png",
    out: "public/assets/work-sterkros-detail/wall-advertisement.webp",
    width: 1800,
    quality: 78,
  },
  {
    src: "public/assets/work-sterkros-detail/gym-bag.png",
    out: "public/assets/work-sterkros-detail/gym-bag.webp",
    width: 1200,
    quality: 78,
  },
  {
    src: "public/assets/work-sterkros-detail/protein-shaker.png",
    out: "public/assets/work-sterkros-detail/protein-shaker.webp",
    width: 1400,
    quality: 78,
  },
  {
    src: "public/assets/work-sterkros-detail/apple-watch.png",
    out: "public/assets/work-sterkros-detail/apple-watch.webp",
    width: 1200,
    quality: 78,
  },
  {
    src: "public/assets/work-sterkros-detail/shirt.png",
    out: "public/assets/work-sterkros-detail/shirt.webp",
    width: 1200,
    quality: 78,
  },
  {
    src: "public/assets/hand-C3sN6PB7.png",
    out: "public/assets/hand-C3sN6PB7.webp",
    width: 1400,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/package-three-sides.jpg",
    out: "public/assets/work-sterkros-detail/package-three-sides.webp",
    width: 1900,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/package-two-sides.jpg",
    out: "public/assets/work-sterkros-detail/package-two-sides.webp",
    width: 1400,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/package-single.jpg",
    out: "public/assets/work-sterkros-detail/package-single.webp",
    width: 1400,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/props-three-sides.jpg",
    out: "public/assets/work-sterkros-detail/props-three-sides.webp",
    width: 1900,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/transformation-bag.jpg",
    out: "public/assets/work-sterkros-detail/transformation-bag.webp",
    width: 1200,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/transformation-protein.jpg",
    out: "public/assets/work-sterkros-detail/transformation-protein.webp",
    width: 1200,
    quality: 80,
  },
  {
    src: "public/assets/work-sterkros-detail/transformation-bottle.jpg",
    out: "public/assets/work-sterkros-detail/transformation-bottle.webp",
    width: 1200,
    quality: 80,
  },
];

const videoJobs = [
  "public/assets/work-sterkros-detail/glitch.mp4",
  "public/assets/work-sterkros-detail/about-video.mp4",
  "public/assets/work-sterkros-detail/finger-grip.mp4",
  "public/assets/work-sterkros-detail/glimpse.mp4",
  "public/assets/work-sterkros-detail/logo-animation.mp4",
  "public/assets/work-sterkros-detail/logo-line-animation.mp4",
  "public/assets/work-3D-homepage.mp4",
  "public/assets/work-kalpa-homepage.mp4",
  "public/assets/work-sterkros-homepage.mp4",
  "public/assets/work-logodesigns-homepage.mp4",
  "public/assets/work-titledesign-homepage.mp4",
  "public/assets/work-magazines-homepage.mp4",
  "public/assets/work-uiuxprojects-homepage.mp4",
  "public/assets/work-packagedesign-homepage.mp4",
  "public/assets/service-media/service-3d.mp4",
  "public/assets/service-media/service-animation.mp4",
  "public/assets/service-media/service-branding.mp4",
  "public/assets/service-media/service-uiux.mp4",
  "public/assets/service-media/service-website.mp4",
];

function abs(relativePath) {
  return path.join(root, relativePath);
}

function backupPath(relativePath) {
  return path.join(backupRoot, relativePath);
}

async function fileSize(file) {
  if (!existsSync(file)) return 0;
  return (await stat(file)).size;
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function ensureOriginal(relativePath) {
  const source = abs(relativePath);
  const backup = backupPath(relativePath);

  if (existsSync(backup)) return backup;
  if (!existsSync(source)) return null;

  await mkdir(path.dirname(backup), { recursive: true });
  await rename(source, backup);
  return backup;
}

async function optimizeImage(job) {
  const original = await ensureOriginal(job.src);
  if (!original) return null;

  const output = abs(job.out);
  await mkdir(path.dirname(output), { recursive: true });

  const before = await fileSize(original);
  await sharp(original)
    .rotate()
    .resize({
      width: job.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: job.quality,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(output);

  const after = await fileSize(output);
  return { kind: "image", file: job.out, before, after };
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `ffmpeg exited with ${code}`));
    });
  });
}

async function optimizeVideo(relativePath) {
  const original = await ensureOriginal(relativePath);
  if (!original) return null;

  const output = abs(relativePath);
  await mkdir(path.dirname(output), { recursive: true });

  const before = await fileSize(original);
  await runFfmpeg([
    "-y",
    "-i", original,
    "-vf", "scale='min(1920,iw)':-2",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "28",
    "-movflags", "+faststart",
    "-an",
    output,
  ]);

  const after = await fileSize(output);
  return { kind: "video", file: relativePath, before, after };
}

const results = [];

for (const job of imageJobs) {
  const result = await optimizeImage(job);
  if (result) results.push(result);
}

for (const video of videoJobs) {
  const result = await optimizeVideo(video);
  if (result) results.push(result);
}

const totalBefore = results.reduce((sum, item) => sum + item.before, 0);
const totalAfter = results.reduce((sum, item) => sum + item.after, 0);

for (const item of results) {
  console.log(`${item.kind.padEnd(5)} ${item.file}: ${formatBytes(item.before)} -> ${formatBytes(item.after)}`);
}

console.log(`Optimized ${results.length} media files: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}.`);
console.log(`Originals are backed up in ${path.relative(root, backupRoot)}.`);
