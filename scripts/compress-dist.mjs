import { brotliCompress, constants, gzip } from "node:zlib";
import { promisify } from "node:util";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);
const distDir = fileURLToPath(new URL("../dist", import.meta.url));
const compressibleExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".xml",
]);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
    } else if (compressibleExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

const files = await collectFiles(distDir);

await Promise.all(
  files.flatMap(async (file) => {
    const source = await readFile(file);
    const [gzipped, brotlied] = await Promise.all([
      gzipAsync(source, { level: 9 }),
      brotliAsync(source, {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
        },
      }),
    ]);

    await Promise.all([
      writeFile(`${file}.gz`, gzipped),
      writeFile(`${file}.br`, brotlied),
    ]);
  }),
);

console.log(`Compressed ${files.length} build assets.`);
