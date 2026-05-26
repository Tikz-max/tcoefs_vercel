import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";

test("about overview no longer renders the team section", () => {
  const aboutPage = readFileSync("app/about/page.tsx", "utf8");

  assert.equal(aboutPage.includes("TeamSection"), false);
});

test("leadership and facilities about routes exist", () => {
  assert.equal(existsSync("app/about/leadership/page.tsx"), true);
  assert.equal(existsSync("app/about/leadership/[slug]/page.tsx"), true);
  assert.equal(existsSync("app/about/facilities/page.tsx"), true);
});

test("leadership data includes featured director, deputies, scientific team, and support team", () => {
  const dataFile = readFileSync("lib/data/leadership.ts", "utf8");

  assert.match(dataFile, /dauda-bawa/);
  assert.match(dataFile, /Deputy Director \(Innovation and Entrepreneurship\)/);
  assert.match(dataFile, /Deputy Director \(Training and Research\)/);
  assert.match(dataFile, /Scientific Team/);
  assert.match(dataFile, /Administrative & Support/);
});
