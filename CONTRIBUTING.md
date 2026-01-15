# Contributing to Engram Rules 🤝

Thank you for helping us build the "immune system" for AI coding.

## The Goal
We want to crowd-source the best regex patterns to stop AI tools (Copilot, Cursor, etc.) from making repeated mistakes.

## 🛠️ How to Add a Rule

1.  **Fork this repository.**
2.  **Pick a Category** in `src/` (e.g., `src/react/`) or create a new folder for a new language/framework.
3.  **Edit `rules.json`** inside that folder.
4.  **Add your Rule Object** (see Schema below).
5.  **Submit a Pull Request.**

## 📐 Rule Schema (JSON)

Every rule in `rules.json` must follow this structure:

```json
{
  "id": "unique-rule-id",         // Format: [category]-[short-description]
  "pattern": "regex_here",        // The Bad Pattern to block. ESCAPE BACKSLASHES!
  "detectionMethod": "regex",     // Always "regex" for now
  "message": "User-facing warning", // What the user sees in the tooltip
  "enforcementLevel": "error"     // "error" (Red Squiggle) or "info" (Blue Squiggle)
}
```

### Example: Blocking `console.log` in Python

```json
{
  "id": "python-console-log",
  "pattern": "print\\(",
  "detectionMethod": "regex",
  "message": "Avoid print() in production. Use a logger.",
  "enforcementLevel": "info"
}
```

## ✅ Self-Verification (IMPORTANT)

Before submitting, please run the validator script to ensure your JSON is valid and your Regex compiles.

```bash
node scripts/validate.js
```

## 🏆 Rewards

*   **1 Accepted Rule**: Your name added to `CONTRIBUTORS.md`.
*   **5 Accepted Rules**: Shoutout in the [Official Engram Extension](https://marketplace.visualstudio.com/items?itemName=use-engram.engram) release notes.
