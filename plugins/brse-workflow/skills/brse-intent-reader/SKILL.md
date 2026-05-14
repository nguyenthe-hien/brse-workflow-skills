---
name: brse-intent-reader
description: Surface implicit expectations and unstated constraints in Japanese stakeholder messages. Converts inferred intent into explicit assumptions and open questions for the dev team.
---

# BrSE Intent Reader

Use this skill when the Japanese customer input is literally short but likely carries unstated expectations. The goal is "行間を読む" — read between the lines — without fabricating requirements.

## When To Use

- Customer message is unusually short for the change being requested.
- Customer uses polite/hedged phrasing ("〜していただけますと幸いです", "ご検討ください") around something operationally important.
- A spec change request that doesn't mention obvious side effects.
- "前回と同様で" / "いつもの通りで" without specifying what "usual" means.
- Customer asks a question that implies a complaint.

## Workflow

1. Read the literal message and write down what is **explicitly** stated.
2. Identify signals that suggest unstated content:
   - Hedging language softening a real demand.
   - Omitted scope that is normally specified.
   - References to past behavior or other projects without detail.
   - Mismatched politeness level (suddenly formal = pressure, suddenly casual = trust or frustration).
3. Generate **inferred intent hypotheses** — each as a falsifiable statement, not a conclusion.
4. For each hypothesis, decide:
   - **Confirm with customer** — when the inference would change scope or timeline.
   - **Apply as default with note** — when the inference is low-risk and BrSE has past precedent.
   - **Discard** — when evidence is too thin.
5. Output explicit assumptions and open questions so downstream skills (clarifier, ticket-breakdown) have clean input.

## Output Shape

```markdown
## Literal Content

(what the customer explicitly said)

## Signals Detected

(hedging / omission / reference / tone shift)

## Inferred Intent Hypotheses

| # | Hypothesis | Confidence | Action |
| - | ---------- | ---------- | ------ |
| 1 |            | low/med/high |      |

## Recommended Customer Clarification (Japanese)

## Assumptions To Apply (with explicit note)
```

## Rules

- Do not present inference as confirmed requirement.
- Each hypothesis must be falsifiable — the customer can answer Yes or No.
- High-confidence hypotheses can be applied as defaults BUT must be visibly noted in the spec/ticket: "前提として ... と判断" — never silently apply.
- If the inference changes scope, deadline, or cost, always confirm; never apply as default.
- Japanese clarification must be respectful and short — not a list of five demands. One focused question per message when possible.
- If signals contradict (formal tone but vague scope), call out the contradiction; do not pick one side arbitrarily.

## Example

**Literal customer message (JP):**
> 「先日の画面、もう少し見やすくしていただけますと幸いです。よろしくお願いいたします。」

**Signals:**
- Hedged demand: "もう少し" + "幸いです" → likely stronger dissatisfaction than wording suggests.
- Omitted scope: which screen, which aspect of "見やすさ", which user role.
- No deadline → customer assumes BrSE will propose one.

**Inferred Intent Hypotheses:**

| # | Hypothesis | Confidence | Action |
| - | ---------- | ---------- | ------ |
| 1 | Customer is unhappy with the recent demo screen (specific) | High | Confirm which screen |
| 2 | "見やすさ" means font/contrast/density, not layout redesign | Medium | Confirm aspect |
| 3 | Customer expects fix in next sprint, not next month | Medium | Propose timeline, confirm |
| 4 | This was raised informally because formal escalation felt heavy | Low | Watch for repeat |

**Recommended customer clarification (JP):**
> 「お世話になっております。先日ご覧いただいた画面の件、ご指摘ありがとうございます。改善方針をすり合わせたく、下記2点だけ確認させてください。
> 1. 対象画面: 〇〇画面でお間違いないでしょうか。
> 2. 改善観点: フォント・余白・情報密度 のいずれが気になる点でしょうか。
> 次回スプリント（〇月〇日週）での対応を想定しております。」

**Assumptions to apply (if customer doesn't reply quickly):**
- Default target screen = the one shown at the demo on [date].
- Default scope = visual readability (font, contrast), not layout restructure.
- Default timeline: **do not apply as default** — timeline affects scope/cost; propose it in the clarification message and wait for confirmation before committing.

For signal patterns and Japanese cultural subtext, read `references/signals.md`.
