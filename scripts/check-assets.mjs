import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = join(projectRoot, "src");
const publicRoot = join(projectRoot, "public");
const sourceFiles = [];

function collectFiles(directory) {
  for (const entry of readdirSync(directory)) {
    const filePath = join(directory, entry);
    if (statSync(filePath).isDirectory()) collectFiles(filePath);
    else if (/\.(ts|tsx)$/.test(filePath)) sourceFiles.push(filePath);
  }
}

collectFiles(sourceRoot);
const missing = [];
const assetPattern = /["'`]([^"'`]*\/assets\/[^"'`]+)["'`]/g;

for (const sourceFile of sourceFiles) {
  const source = readFileSync(sourceFile, "utf8");
  for (const match of source.matchAll(assetPattern)) {
    const assetUrl = match[1].replace(/^\/+/, "");
    if (!existsSync(join(publicRoot, assetUrl))) {
      missing.push(`${relative(projectRoot, sourceFile)} -> /${assetUrl}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Missing public assets:\n" + missing.join("\n"));
  process.exit(1);
}

console.log(`Validated asset references in ${sourceFiles.length} source files.`);
