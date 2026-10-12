import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const css = fs
  .readFileSync(path.join(dist, "assets/site.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,>])\s*/g, "$1")
  .trim();
const js = fs.readFileSync(path.join(dist, "assets/site.js"), "utf8").trim();

const htmlFiles = [];
const collectHtml = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(target);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(target);
  }
};
collectHtml(dist);

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  const inlineCss = `<style data-inline="site">${css}</style>`;
  const inlineJs = `<script data-inline="site">${js}</script>`;

  if (/<style data-inline="site">[\s\S]*?<\/style>/.test(html)) {
    html = html.replace(/<style data-inline="site">[\s\S]*?<\/style>/, inlineCss);
  } else {
    html = html.replace('<link rel="stylesheet" href="/assets/site.css">', inlineCss);
  }

  if (/<script data-inline="site">[\s\S]*?<\/script>/.test(html)) {
    html = html.replace(/<script data-inline="site">[\s\S]*?<\/script>/, inlineJs);
  } else {
    html = html.replace('<script src="/assets/site.js" defer></script>', inlineJs);
  }

  fs.writeFileSync(file, html);
}
