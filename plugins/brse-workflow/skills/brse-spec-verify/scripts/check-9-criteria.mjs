#!/usr/bin/env node
// check-9-criteria.mjs
// Static pre-check for BrSE requirement documents against ISO/IEC/IEEE 29148 9-criteria.
//
// This script catches the MECHANICAL violations only. Semantic checks
// (Correct / Feasible / Necessary) require human judgment and the
// original source document. Run this before invoking brse-spec-verify
// to clear obvious failures.
//
// Usage:
//   node check-9-criteria.mjs path/to/spec.md
//   node check-9-criteria.mjs path/to/spec.md --json
//
// Exit code: 0 if no mechanical failures, 1 otherwise.

import { readFileSync } from "node:fs";
import { argv, exit } from "node:process";

const args = argv.slice(2);
const jsonOut = args.includes("--json");
const path = args.find((a) => !a.startsWith("--"));

if (!path) {
  console.error("Usage: node check-9-criteria.mjs <spec.md> [--json]");
  exit(2);
}

const src = readFileSync(path, "utf8");

// ---------------------------------------------------------------------------
// Required sections (Complete)
// ---------------------------------------------------------------------------

const REQUIRED_SECTIONS = [
  { name: "Goal/Summary", patterns: [/^##\s+.*(?:Summary|Requirement Summary|目的|概要|Goal)/im] },
  { name: "Scope", patterns: [/^##\s+.*(?:Scope|範囲|対象)/im] },
  { name: "Current Behavior", patterns: [/^##\s+.*(?:Current Behavior|現状|現行|As-Is)/im] },
  { name: "Expected Behavior", patterns: [/^##\s+.*(?:Expected Behavior|期待|To-Be|あるべき)/im] },
  { name: "Acceptance Criteria", patterns: [/^##\s+.*(?:Acceptance Criteria|受け入れ|AC|完了条件)/im] },
  { name: "Open Questions", patterns: [/^##\s+.*(?:Open Questions?|確認事項|未確定)/im] },
];

// ---------------------------------------------------------------------------
// Forbidden hedging words (Unambiguous)
// JP and EN combined. Each match returns a line excerpt.
// ---------------------------------------------------------------------------

const HEDGING_PATTERNS = [
  // Japanese hedging
  /適切に/g,
  /正しく/g,
  /必要に応じて/g,
  /状況によって/g,
  /可能な限り/g,
  /なるべく/g,
  /できるだけ/g,
  /柔軟に/g,
  /なんとなく/g,
  // English hedging
  /\bappropriately\b/gi,
  /\bproperly\b/gi,
  /\bas needed\b/gi,
  /\bif possible\b/gi,
  /\bmay\b(?!\s+\d)/gi,
  /\bshould be\b/gi,
  /\bsomewhat\b/gi,
];

// ---------------------------------------------------------------------------
// Compound AC detection (Singular)
// AC with " and " / "及び" / "かつ" likely combine multiple rules.
// ---------------------------------------------------------------------------

const COMPOUND_AC_PATTERNS = [
  /\band\b.*\band\b/i,
  /、.+、.+(?:こと|する)/,
  /及び/,
  /かつ/,
  /また/,
];

// ---------------------------------------------------------------------------
// Traceable indicators
// ---------------------------------------------------------------------------

const TRACEABLE_PATTERNS = [
  /\bPRJ-\w+\b/,
  /\b[A-Z]{2,}-\d+\b/, // generic ticket ID
  /https?:\/\//,
  /#\d+/,
  /^##?\s+Source/im,
];

// ---------------------------------------------------------------------------
// Run checks
// ---------------------------------------------------------------------------

const findings = [];

// Complete
for (const sec of REQUIRED_SECTIONS) {
  const found = sec.patterns.some((p) => p.test(src));
  if (!found) {
    findings.push({ criterion: "Complete", severity: "fail", message: `Missing section: ${sec.name}` });
  }
}

// Unambiguous
const lines = src.split("\n");
lines.forEach((line, idx) => {
  for (const re of HEDGING_PATTERNS) {
    if (re.test(line)) {
      findings.push({
        criterion: "Unambiguous",
        severity: "fail",
        message: `Hedging word in line ${idx + 1}: "${line.trim()}"`,
      });
      break;
    }
  }
});

// Singular (only inspect AC bullets / numbered list items inside AC section)
const acSectionMatch = src.match(/^##\s+.*(?:Acceptance Criteria|受け入れ|AC|完了条件)[\s\S]*?(?=^##\s+|\Z)/im);
if (acSectionMatch) {
  const acLines = acSectionMatch[0].split("\n");
  acLines.forEach((line, idx) => {
    if (!/^[-*\d]/.test(line.trim())) return;
    for (const re of COMPOUND_AC_PATTERNS) {
      if (re.test(line)) {
        findings.push({
          criterion: "Singular",
          severity: "warn",
          message: `AC may combine multiple rules: "${line.trim()}"`,
        });
        break;
      }
    }
  });
}

// Verifiable — heuristic: every AC line should contain at least one observable predicate
if (acSectionMatch) {
  const acLines = acSectionMatch[0].split("\n").filter((l) => /^[-*\d]/.test(l.trim()));
  const observable = /(表示|非表示|返す|遷移|エラー|成功|失敗|click|return|render|display|reject|accept|equals?|=|>|<|status\s*\d)/i;
  acLines.forEach((line) => {
    if (!observable.test(line)) {
      findings.push({
        criterion: "Verifiable",
        severity: "warn",
        message: `AC may lack observable predicate: "${line.trim()}"`,
      });
    }
  });
}

// Traceable
const hasTrace = TRACEABLE_PATTERNS.some((p) => p.test(src));
if (!hasTrace) {
  findings.push({
    criterion: "Traceable",
    severity: "fail",
    message: "No ticket ID / URL / Source section detected",
  });
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const failCount = findings.filter((f) => f.severity === "fail").length;
const warnCount = findings.filter((f) => f.severity === "warn").length;

if (jsonOut) {
  console.log(JSON.stringify({ path, findings, failCount, warnCount }, null, 2));
} else {
  if (findings.length === 0) {
    console.log(`PASS: ${path}`);
    console.log("Mechanical 9-criteria pre-check found no obvious violations.");
    console.log("Note: Correct / Feasible / Necessary require human review against the original source.");
  } else {
    console.log(`FINDINGS for ${path}: ${failCount} fail, ${warnCount} warn`);
    for (const f of findings) {
      const tag = f.severity === "fail" ? "[FAIL]" : "[WARN]";
      console.log(`  ${tag} ${f.criterion}: ${f.message}`);
    }
    console.log("");
    console.log("Next step: invoke brse-spec-verify for semantic review (Correct / Feasible / Necessary).");
  }
}

exit(failCount > 0 ? 1 : 0);
