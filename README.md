# Engram Community Rules 🧠

**The Open Source Bug Database for Vibe Coding.**

This repository hosts community-sourced "Shadow Guard" rules for [Engram](https://marketplace.visualstudio.com/items?itemName=use-engram.engram).
By contributing here, you help thousands of developers (and their AI assistants) avoid common mistakes globally.

## 🏆 The Bug Bounty Game

We are gamifying bug prevention.
*   **Contributor**: Submit 1 valid rule -> Get listed in `CONTRIBUTORS.md`.
*   **Hunter**: Submit 5 valid rules -> Get a shoutout in the Official Extension README per release.
*   **Architect**: Create a new Category (e.g., `rust-safety`) -> We will feature your profile on our Twitter.

### Current Bounties 🎯
We are looking for:
1.  **AI Hallucinations**: Specific patterns where Copilot/Cursor generates invalid code (e.g., non-existent Tailwind classes).
2.  **Security Leaks**: Regexes for API keys we missed.
3.  **Framework Antipatterns**: "Do not do X in Next.js".

## How to Contribute

1.  Find a category in `src/` (or create a new one).
2.  Add a `MistakeFingerprint` to the `rules.json` file.
    ```json
    {
      "id": "my-new-rule",
      "pattern": "console\\.log\\(",
      "detectionMethod": "regex",
      "message": "No logs in prod!",
      "enforcementLevel": "error"
    }
    ```
3.  Open a PR titled: `feat: Add rule for [BUG NAME]`.

## Usage
To use these rules:
1.  Download the `.json` file you want (e.g., `src/react/rules.json`).
2.  In VS Code, run `> Engram: Import Rules`.
3.  Select the file.

Done. Your AI is now smarter.
