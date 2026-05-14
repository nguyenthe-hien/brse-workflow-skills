# QA Patterns

## Minimum Useful Set

- Happy path.
- No-permission or wrong-role path.
- Existing data path.
- New data path.
- Invalid input or missing required data.
- Regression for the nearest old behavior.

## Customer Demo Set

Use fewer, business-relevant cases:

- One representative success path.
- One important restriction or exception.
- One before/after behavior if the change is hard to see.

## Japanese Wording

- Use screen labels and business actions the customer recognizes.
- Prefer "表示されること", "更新されること", "選択できること", "エラーとなること".
- Avoid raw implementation names unless they are visible product terms.
