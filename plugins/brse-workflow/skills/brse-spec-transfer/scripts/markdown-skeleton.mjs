#!/usr/bin/env node
// markdown-skeleton.mjs
// Generate the canonical markdown skeleton for a BrSE spec transfer target.
//
// Two modes:
//   --to ticket    Output the ticket structure (Summary/Scope/Requirements/AC/Reference)
//   --to demo      Preserve the source structure but emit a clean JP-ready skeleton
//
// Optional input: read a source markdown file to extract headings and tables,
// then re-emit them in the target order. This is a structure-preserving
// scaffolder, not a translator.
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
// ---------------------------------------------------------------------------

function extractHeadings(md) {
  return md
    .split("\n")
    .filter((l) => /^#{1,6}\s+/.test(l))
    .map((l) => {
      const m = l.match(/^(#{1,6})\s+(.+)$/);
      return { level: m[1].length, text: m[2].trim() };
    });
}

function extractTables(md) {
  const tables = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    if (/^\|.+\|$/.test(lines[i]) && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1])) {
      const table = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        table.push(lines[i]);
        i++;
      }
      tables.push(table);
    } else {
      i++;
    }
  }
  return tables;
}

let sourceHeadings = [];
let sourceTables = [];

if (source) {
  const md = readFileSync(source, "utf8");
  sourceHeadings = extractHeadings(md);
  sourceTables = extractTables(md);
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
  if (sourceHeadings.length === 0) {
    return [
      "# [Source title]",
      "",
      "[Preserve customer-facing structure as-is. This skeleton is empty because no --source was provided.]",
      "",
    ].join("\n");
  }
  const parts = [];
  for (const h of sourceHeadings) {
    parts.push(`${"#".repeat(h.level)} ${h.text}`);
    parts.push("");
    parts.push("[Content placeholder — preserve source wording, translate to JP only if the customer-facing language requires it. Keep product names, screen names, role labels, task IDs, version codes, and third-party tool names unchanged.]");
    parts.push("");
  }
  if (sourceTables.length > 0) {
    parts.push("---");
    parts.push("");
    parts.push("## Tables Extracted From Source");
    parts.push("");
    for (let i = 0; i < sourceTables.length; i++) {
      parts.push(`### Table ${i + 1}`);
      parts.push("");
      parts.push(...sourceTables[i]);
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
