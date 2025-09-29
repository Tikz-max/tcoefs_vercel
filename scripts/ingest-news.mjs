/**
 * scripts/ingest-news.mjs
 *
 * Add Node script to ingest .docx news: extract HTML and images and output JSON payload.
 *
 * What it does:
 * - Scans the project "News" folder for .docx files.
 * - Converts each .docx to HTML.
 * - Extracts embedded images and writes them to: public/news/<slug>/images/
 * - Emits a JSON index at: public/news/news.generated.json with card-friendly fields:
 *    [{ id, slug, category, title, excerpt, date, readTime, image, featured, fullContent }]
 *
 * Run:
 *   - Install dependency once:  npm i -D mammoth
 *   - Execute the script:       node ./scripts/ingest-news.mjs
 *
 * The News & Events page can then import or fetch "/news/news.generated.json"
 * and merge it with any existing hardcoded items.
 */

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve project root from this file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SRC_DIR = path.join(ROOT, "News");
const OUT_BASE_DIR = path.join(ROOT, "public", "news");
const OUT_INDEX_JSON = path.join(OUT_BASE_DIR, "news.generated.json");

// Try to import mammoth (docx -> HTML + images)
let mammoth;
try {
  mammoth = await import("mammoth");
} catch (err) {
  console.error(
    [
      "Missing dependency: mammoth",
      "",
      "Install it first:",
      "  npm i -D mammoth",
      "",
      "Then re-run:",
      "  node ./scripts/ingest-news.mjs",
    ].join("\n"),
  );
  process.exit(1);
}

// Utilities
const ensureDir = async (dir) => {
  await fsp.mkdir(dir, { recursive: true });
};

const slugify = (str) => {
  return String(str)
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 80);
};

const stripHtml = (html) => {
  return String(html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const formatDate = (d) =>
  d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const estimateReadTime = (text) => {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const guessCategory = (title = "", bodyText = "") => {
  const t = `${title} ${bodyText}`.toLowerCase();
  if (/\b(policy|stakeholder|senate|legislative|reform)\b/.test(t))
    return "Policy";
  if (/\b(partner|partnership|collaboration|mou|giz|saa)\b/.test(t))
    return "Partnership";
  if (/\b(research|study|genetics|lecture|seminar|initiative)\b/.test(t))
    return "Research";
  return "News";
};

// Main conversion
const ingest = async () => {
  // Validate source directory
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  await ensureDir(OUT_BASE_DIR);

  // List .docx files
  const all = await fsp.readdir(SRC_DIR);
  const docxFiles = all.filter((f) => /\.docx$/i.test(f));

  if (docxFiles.length === 0) {
    console.warn(`No .docx files found in ${SRC_DIR}`);
    // Still emit an empty array to avoid 404s downstream
    await fsp.writeFile(OUT_INDEX_JSON, JSON.stringify([], null, 2), "utf8");
    console.log(`Wrote: ${path.relative(ROOT, OUT_INDEX_JSON)} (0 items)`);
    return;
  }

  const results = [];

  for (const [i, file] of docxFiles.entries()) {
    const absPath = path.join(SRC_DIR, file);
    const buf = await fsp.readFile(absPath);
    const stat = await fsp.stat(absPath);

    // Try to get plain text to infer title/excerpt
    let rawText = "";
    try {
      const { value } = await mammoth.default.extractRawText({ buffer: buf });
      rawText = value || "";
    } catch {
      // ignore
    }

    // Title from first non-empty line of raw text or file name
    const firstLine =
      rawText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .find((s) => s.length > 0) || "";
    const baseName = path.basename(file, path.extname(file));
    const inferredTitle = firstLine.length >= 8 ? firstLine : baseName;

    const slugBase = slugify(inferredTitle || baseName);
    const slug = slugBase || `news-item-${i + 1}`;

    const outDir = path.join(OUT_BASE_DIR, slug);
    const outImgDir = path.join(outDir, "images");
    await ensureDir(outImgDir);

    // Convert to HTML with image extraction
    const imagePaths = [];
    let imageIndex = 0;

    const { value: html } = await mammoth.default.convertToHtml(
      { buffer: buf },
      {
        styleMap: [
          // A few helpful mappings (optional)
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Subtitle'] => h2:fresh",
          "p[style-name='Heading 1'] => h2:fresh",
          "p[style-name='Heading 2'] => h3:fresh",
          "p[style-name='Heading 3'] => h4:fresh",
        ],
        convertImage: mammoth.default.images.inline(async (image) => {
          const contentType = image.contentType || "image/png";
          const ext = contentType.split("/")[1] || "png";
          const imgName = `img-${++imageIndex}.${ext}`;
          const imgAbs = path.join(outImgDir, imgName);
          const buffer = await image.read();
          await fsp.writeFile(imgAbs, buffer);
          const publicSrc = `/news/${slug}/images/${imgName}`;
          imagePaths.push(publicSrc);
          return { src: publicSrc };
        }),
      },
    );

    // Derive excerpt: from first <p> or stripped text of first 40-50 words
    const textForExcerpt = stripHtml(html).trim();
    const words = textForExcerpt.split(/\s+/).filter(Boolean);
    const excerpt =
      words.length > 50 ? `${words.slice(0, 50).join(" ")}…` : textForExcerpt;

    const date = formatDate(stat.mtime);
    const readTime = estimateReadTime(textForExcerpt);
    const category = guessCategory(inferredTitle, textForExcerpt);
    const heroImage = imagePaths[0] || ""; // Prefer first embedded image. Empty if none.

    results.push({
      id: i + 1_000, // keep a high range to avoid collision with existing hardcoded ids
      slug,
      category,
      title: inferredTitle,
      excerpt,
      date,
      readTime,
      image: heroImage, // leave empty if none—frontend should fallback when empty
      featured: true,
      fullContent: html,
      images: imagePaths,
      sourceFile: path.relative(ROOT, absPath),
    });

    // Also persist the HTML body for each article (optional, helpful for debugging or static serving)
    const outHtml = path.join(outDir, "index.html");
    const htmlDoc = [
      "<!doctype html>",
      "<meta charset='utf-8'/>",
      `<title>${inferredTitle}</title>`,
      "<style>",
      "body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#2f3e2f;max-width:72ch;margin:2rem auto;padding:0 1rem}",
      "img{max-width:100%;height:auto;border-radius:12px}",
      "h1,h2,h3,h4{color:#2f3e2f}",
      "</style>",
      `<h1>${inferredTitle}</h1>`,
      `<p><em>${category} • ${date} • ${readTime}</em></p>`,
      html,
    ].join("\n");
    await ensureDir(outDir);
    await fsp.writeFile(outHtml, htmlDoc, "utf8");
  }

  // Write JSON index
  await fsp.writeFile(OUT_INDEX_JSON, JSON.stringify(results, null, 2), "utf8");

  console.log(`Ingested ${results.length} news item(s).`);
  console.log(
    `Images saved under: ${path.relative(ROOT, OUT_BASE_DIR)}/<slug>/images/`,
  );
  console.log(`JSON written to:    ${path.relative(ROOT, OUT_INDEX_JSON)}`);
  console.log(
    `HTML previews at:   ${path.relative(ROOT, OUT_BASE_DIR)}/<slug>/index.html`,
  );
};

// Execute
ingest().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
