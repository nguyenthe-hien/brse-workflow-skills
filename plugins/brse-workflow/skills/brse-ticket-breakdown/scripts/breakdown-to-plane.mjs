#!/usr/bin/env node
// breakdown-to-plane.mjs
// Convert a YAML ticket breakdown (output of brse-ticket-breakdown) into
// Plane-compatible JSON ticket payloads, ready to be POSTed by an MCP tool
// or `curl`. This script does NOT call any API — it produces the JSON only.
//
// Usage:
//   node breakdown-to-plane.mjs path/to/breakdown.yaml
//   node breakdown-to-plane.mjs path/to/breakdown.yaml --project PRJ-123
//
// Input YAML shape (matches brse-ticket-breakdown Output Shape):
//
//   tickets:
//     - title: "Hide Edit button on UserProfile for staff role"
//       goal: "..."
//       scope: "..."
//       affected_surface: "..."
//       dependencies: ["other-title-1"]
//       acceptance_criteria:
//         - "AC1: ..."
//         - "AC2: ..."
//       qa: "..."
//       open_questions: []
//       labels: ["FE", "permission"]
//       priority: "high"
//   delivery_risks: "..."
//
// Output: JSON array of Plane create-issue payloads to stdout.

import { readFileSync } from "node:fs";
import { argv, exit } from "node:process";

const args = argv.slice(2);
const path = args.find((a) => !a.startsWith("--"));
const projectIdx = args.indexOf("--project");
const projectId = projectIdx >= 0 ? args[projectIdx + 1] : null;

if (!path) {
  console.error("Usage: node breakdown-to-plane.mjs <breakdown.yaml> [--project ID]");
  exit(2);
}

const raw = readFileSync(path, "utf8");

// ---------------------------------------------------------------------------
// Minimal YAML parser
// Supports: nested keys (2-space indent), inline lists [a, b], block lists,
// scalar strings (single line and quoted). No anchors / aliases / multi-line
// scalars. Sufficient for the ticket-breakdown contract.
// ---------------------------------------------------------------------------

function parseYaml(text) {
  const lines = text.split("\n").filter((l) => !/^\s*#/.test(l) && l.trim() !== "");
  let pos = 0;

  // A list item is treated as an inline-key object only if:
  //  - it starts with an unquoted identifier
  //  - then a colon followed by space or end-of-line
  // A quoted string (starts with " or ') is always a scalar.
  function looksLikeInlineKey(s) {
    if (s.startsWith('"') || s.startsWith("'")) return false;
    const m = s.match(/^([A-Za-z_][\w-]*)\s*:(\s|$)/);
    return !!m;
  }
  function firstUnquotedColon(s) {
    return s.indexOf(":");
  }

  function indentOf(line) {
    const m = line.match(/^(\s*)/);
    return m ? m[1].length : 0;
  }

  function parseScalar(raw) {
    let s = raw.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      return s.slice(1, -1);
    }
    if (s.startsWith("[") && s.endsWith("]")) {
      const inner = s.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(",").map((x) => parseScalar(x));
    }
    if (s === "true") return true;
    if (s === "false") return false;
    if (s === "null" || s === "~") return null;
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
    return s;
  }

  function parseBlock(baseIndent) {
    const result = {};
    while (pos < lines.length) {
      const line = lines[pos];
      const indent = indentOf(line);
      if (indent < baseIndent) break;
      if (indent > baseIndent) {
        // Should have been consumed by recursion
        pos++;
        continue;
      }
      const content = line.slice(indent);
      const colonIdx = content.indexOf(":");
      if (colonIdx < 0) {
        pos++;
        continue;
      }
      const key = content.slice(0, colonIdx).trim();
      const rest = content.slice(colonIdx + 1).trim();
      pos++;

      if (rest === "") {
        // Look ahead: list of dashes, or nested block
        if (pos < lines.length) {
          const nextLine = lines[pos];
          const nextIndent = indentOf(nextLine);
          const nextContent = nextLine.slice(nextIndent);
          if (nextIndent > baseIndent && nextContent.startsWith("-")) {
            result[key] = parseList(nextIndent);
          } else if (nextIndent > baseIndent) {
            result[key] = parseBlock(nextIndent);
          } else {
            result[key] = null;
          }
        } else {
          result[key] = null;
        }
      } else {
        result[key] = parseScalar(rest);
      }
    }
    return result;
  }

  function parseList(baseIndent) {
    const arr = [];
    while (pos < lines.length) {
      const line = lines[pos];
      const indent = indentOf(line);
      if (indent < baseIndent) break;
      const content = line.slice(indent);
      if (!content.startsWith("-")) break;
      const after = content.slice(1).trim();
      pos++;
      if (after === "") {
        // nested object on next lines
        if (pos < lines.length) {
          const nextIndent = indentOf(lines[pos]);
          if (nextIndent > baseIndent) {
            arr.push(parseBlock(nextIndent));
          } else {
            arr.push(null);
          }
        }
      } else if (looksLikeInlineKey(after)) {
        // inline first key, then maybe nested
        const colonIdx = firstUnquotedColon(after);
        const k = after.slice(0, colonIdx).trim();
        const v = after.slice(colonIdx + 1).trim();
        const obj = {};
        obj[k] = v === "" ? null : parseScalar(v);
        // Continue collecting subsequent keys at the same sub-indent
        while (pos < lines.length) {
          const nxt = lines[pos];
          const nxtIndent = indentOf(nxt);
          if (nxtIndent <= baseIndent) break;
          const nxtContent = nxt.slice(nxtIndent);
          if (nxtContent.startsWith("-")) break;
          const ci = nxtContent.indexOf(":");
          if (ci < 0) {
            pos++;
            continue;
          }
          const kk = nxtContent.slice(0, ci).trim();
          const vv = nxtContent.slice(ci + 1).trim();
          pos++;
          if (vv === "") {
            // nested list / block
            if (pos < lines.length) {
              const nIndent = indentOf(lines[pos]);
              const nContent = lines[pos].slice(nIndent);
              if (nIndent > nxtIndent && nContent.startsWith("-")) {
                obj[kk] = parseList(nIndent);
              } else if (nIndent > nxtIndent) {
                obj[kk] = parseBlock(nIndent);
              } else {
                obj[kk] = null;
              }
            }
          } else {
            obj[kk] = parseScalar(vv);
          }
        }
        arr.push(obj);
      } else {
        arr.push(parseScalar(after));
      }
    }
    return arr;
  }

  return parseBlock(0);
}

const data = parseYaml(raw);

if (!data.tickets || !Array.isArray(data.tickets)) {
  console.error("Input YAML must contain a top-level `tickets:` list.");
  exit(2);
}

// ---------------------------------------------------------------------------
// Build Plane payloads
// ---------------------------------------------------------------------------

function buildDescription(t) {
  const parts = [];
  if (t.goal) parts.push(`## Goal\n\n${t.goal}`);
  if (t.scope) parts.push(`## Scope\n\n${t.scope}`);
  if (t.affected_surface) parts.push(`## Affected Surface\n\n${t.affected_surface}`);
  if (Array.isArray(t.acceptance_criteria) && t.acceptance_criteria.length) {
    parts.push("## Acceptance Criteria\n\n" + t.acceptance_criteria.map((c) => `- ${c}`).join("\n"));
  }
  if (t.qa) parts.push(`## QA\n\n${t.qa}`);
  if (Array.isArray(t.open_questions) && t.open_questions.length) {
    parts.push("## Open Questions\n\n" + t.open_questions.map((q) => `- ${q}`).join("\n"));
  }
  return parts.join("\n\n");
}

const payloads = data.tickets.map((t, i) => ({
  external_ref: t.title || `ticket-${i + 1}`,
  project: projectId,
  name: t.title || `Ticket ${i + 1}`,
  description_md: buildDescription(t),
  priority: t.priority || "medium",
  labels: Array.isArray(t.labels) ? t.labels : [],
  // Dependencies are kept as titles; the API caller resolves them
  // to UUIDs after issues are created.
  brse_dependencies: Array.isArray(t.dependencies) ? t.dependencies : [],
}));

const output = {
  delivery_risks: data.delivery_risks || null,
  tickets: payloads,
};

console.log(JSON.stringify(output, null, 2));
