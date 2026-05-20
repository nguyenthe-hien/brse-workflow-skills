#!/usr/bin/env node
// markdown-skeleton.mjs
// Generate the canonical markdown skeleton for a BrSE spec transfer target.
//
// Two modes:
//   --to ticket    Emit the canonical ticket structure
//                  (Summary / Scope / Requirements / AC / Reference)
//   --to demo      Emit a demo/customer skeleton. With --source, extracts
//                  HEADINGS and TABLES from the source and re-emits them in
//                  their ORIGINAL ORDER. Bullets, paragraphs, code blocks,
//                  link placement, and inline images are NOT preserved by
//                  this script — open the source side-by-side when filling
//                  the content placeholders.
//
// This is a structure-preserving SCAFFOLDER, not a markdown translator or
// full converter. Treat the output as a starting skeleton, not a faithful
// rendering of the source.
//
// Usage:
//   node markdown-skeleton.mjs --to ticket
//   node markdown-skeleton.mjs --to ticket --source path/to/source.md
//   node markdown-skeleton.mjs --to demo --source path/to/source.md

import { readFileSync } from "node:fs";
import { argv, exit } from "node:process";

const args = argv.slice(2);
const toIdx = args.indexOf("--to");
const srcIdx = args.indexOf("--source");
const target = toIdx >= 0 ? args[toIdx + 1] : null;
const source = srcIdx >= 0 ? args[srcIdx + 1] : null;

if (!target || !["ticket", "demo"].includes(target)) {
  console.error("Usage: node markdown-skeleton.mjs --to <ticket|demo> [--source <file.md>]");
  exit(2);
}

// ---------------------------------------------------------------------------
// Source extraction (optional)
//
// Produces a flat list of structural blocks in their ORIGINAL order:
//   { kind: "heading", level: number, text: string }
//   { kind: "table",   rows: string[] }
//
// This is the only structural information the skeleton preserves. All
// other markdown blocks (paragraphs, bullets, code fences, blockquotes,
// images) are intentionally NOT extracted — the script's contract is
// limited to headings + tables in order.
// ---------------------------------------------------------------------------

function extractBlocks(md) {
  const blocks = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        kind: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }
    if (
      /^\|.+\|$/.test(line) &&
      i + 1 < lines.length &&
      /^\|[\s\-:|]+\|$/.test(lines[i + 1])
    ) {
      const rows = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      blocks.push({ kind: "table", rows });
      continue;
    }
    i++;
  }
  return blocks;
}

let sourceBlocks = [];

if (source) {
  const md = readFileSync(source, "utf8");
  sourceBlocks = extractBlocks(md);
}

// ---------------------------------------------------------------------------
// Emit skeleton
// ---------------------------------------------------------------------------

function emitTicket() {
  return [
    "## Summary",
    "",
    "[One-paragraph customer-facing description of what this ticket delivers and why.]",
    "",
    "## Scope",
    "",
    "- In: [included]",
    "- Out: [excluded]",
    "",
    "## Requirements",
    "",
    "- [Functional rule 1]",
    "- [Functional rule 2]",
    "",
    "## Acceptance Criteria",
    "",
    "- [ ] AC1: [observable check]",
    "- [ ] AC2: [observable check]",
    "",
    "## Reference Info By AI",
    "",
    "[Source trace, related ticket IDs, screenshots, links. Keep separate from requirement content.]",
    "",
  ].join("\n");
}

function emitDemoFromSource() {
  if (sourceBlocks.length === 0) {
    return [
      "# [Source title]",
      "",
      "[Skeleton empty: source file contained no headings or tables to anchor on. Author the target document by hand, side-by-side with the source.]",
      "",
    ].join("\n");
  }
  const parts = [];
  parts.push(
    "<!-- Scaffolded by markdown-skeleton.mjs. Only headings and tables are preserved in order. Paragraphs, bullets, code blocks, images, and link placement are NOT carried over — open the source side-by-side when filling content placeholders. -->",
    "",
  );
  for (const block of sourceBlocks) {
    if (block.kind === "heading") {
      parts.push(`${"#".repeat(block.level)} ${block.text}`);
      parts.push("");
      parts.push(
        "[Content placeholder — preserve source wording, translate to JP only if the customer-facing language requires it. Keep product names, screen names, role labels, task IDs, version codes, and third-party tool names unchanged.]",
      );
      parts.push("");
    } else if (block.kind === "table") {
      parts.push(...block.rows);
      parts.push("");
    }
  }
  return parts.join("\n");
}

function emitDemo() {
  if (source) return emitDemoFromSource();
  return [
    "# [Customer Document Title]",
    "",
    "## 目的",
    "",
    "[Why this change is needed, from the customer's perspective.]",
    "",
    "## 対象範囲",
    "",
    "[Surfaces, roles, tenants affected.]",
    "",
    "## 仕様詳細",
    "",
    "[Detailed behavior, preserving any source tables, screenshots, and labels.]",
    "",
    "## 確認事項",
    "",
    "[Open questions to customer — see brse-qa-scenario for confirmation block format.]",
    "",
  ].join("\n");
}

if (target === "ticket") {
  process.stdout.write(emitTicket());
} else {
  process.stdout.write(emitDemo());
}
