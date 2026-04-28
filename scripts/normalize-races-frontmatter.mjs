import fs from "node:fs";
import path from "node:path";

const canonicalOrder = [
  "raceName",
  "trackName",
  "trackLocation",
  "trackCountry",
  "trackImage",
  "trackImageLarge",
  "trackImageAlt",
  "trackImageLargeAlt",
  "raceDate",
  "raceTime",
  "raceWeekend",
  "raceWeekendOrder",
  "raceWeekendDescription",
  "season",
  "winningDriver",
  "winningConstructor",
  "fastestLapDriver",
  "fastestLapConstructor",
  "fastestLapTime",
  "raceWeekendDateRange",
  "raceNumber",
  "laps",
  "time",
  "hasSprint",
  "raceCompleted",
  "raceResults",
  "practice1Results",
  "practice2Results",
  "practice3Results",
  "qualifyingResults",
  "sprintResults",
  "fastestLapResults",
  "pubDate",
  "updatedDate",
  "heroImage",
];

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name));
}

function splitFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)?$/);
  if (!match) return null;
  return {
    frontmatter: match[1],
    body: match[2] ?? "\n",
  };
}

function parseTopLevelBlocks(frontmatter, eol) {
  const lines = frontmatter.split(/\r?\n/);
  const blocks = [];
  const keyLineRegex = /^([A-Za-z][A-Za-z0-9]*):(?:\s.*)?$/;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(keyLineRegex);

    if (!keyMatch) {
      i += 1;
      continue;
    }

    const key = keyMatch[1];
    const blockLines = [line];
    i += 1;

    while (i < lines.length && !keyLineRegex.test(lines[i])) {
      blockLines.push(lines[i]);
      i += 1;
    }

    while (blockLines.length > 1 && blockLines[blockLines.length - 1] === "") {
      blockLines.pop();
    }

    blocks.push({ key, text: blockLines.join(eol) });
  }

  return blocks;
}

function normalizeFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";

  const parts = splitFrontmatter(raw);
  if (!parts) return false;

  const blocks = parseTopLevelBlocks(parts.frontmatter, eol);
  if (blocks.length === 0) return false;

  const map = new Map();
  const seenOrder = [];

  for (const block of blocks) {
    if (!map.has(block.key)) {
      seenOrder.push(block.key);
    }
    map.set(block.key, block.text);
  }

  const orderedKeys = [
    ...canonicalOrder.filter((key) => map.has(key)),
    ...seenOrder.filter((key) => !canonicalOrder.includes(key)),
  ];

  const normalizedFrontmatter = orderedKeys.map((key) => map.get(key)).join(eol);
  const normalized = `---${eol}${normalizedFrontmatter}${eol}---${parts.body}`;

  if (normalized === raw) return false;

  fs.writeFileSync(filePath, normalized, "utf8");
  return true;
}

const targetDirArg = process.argv[2] ?? "src/content/races/2026";
const targetDir = path.resolve(process.cwd(), targetDirArg);

if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
  console.error(`Directory not found: ${targetDirArg}`);
  process.exit(1);
}

const files = listMarkdownFiles(targetDir);
const changed = [];

for (const file of files) {
  if (normalizeFile(file)) {
    changed.push(path.relative(process.cwd(), file));
  }
}

console.log(`Normalized ${changed.length} file(s).`);
for (const file of changed) {
  console.log(file);
}
