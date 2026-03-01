# CLAUDE.md — AI Assistant Guide for Unep-evik

This file provides context and conventions for AI assistants (e.g., Claude Code) working in this repository. Keep this document up to date as the project evolves.

---

## Repository Status

**Current state:** Freshly initialized — no source code has been committed yet.

This document will be updated as the project grows. Sections marked with `[TODO]` should be filled in once the corresponding code or configuration is in place.

---

## Project Overview

| Field       | Value                          |
|-------------|--------------------------------|
| Repository  | `soouni/Unep-evik`             |
| Description | [TODO: Add a short description of what this project does] |
| Primary language | [TODO: e.g., TypeScript, Python, Go] |
| License     | [TODO]                         |

---

## Repository Structure

```
Unep-evik/
├── CLAUDE.md          ← This file
├── README.md          ← [TODO] Human-facing documentation
├── [TODO: add source directories as they are created]
```

Update this tree whenever major directories are added or removed.

---

## Tech Stack

[TODO: Fill in once code is committed. Example format:]

- **Language:** [e.g., TypeScript 5.x / Python 3.12 / Go 1.22]
- **Framework:** [e.g., Next.js 14 / FastAPI / Echo]
- **Database:** [e.g., PostgreSQL 16 via Prisma / SQLite / None]
- **Testing:** [e.g., Vitest / Pytest / Go test]
- **Linting/Formatting:** [e.g., ESLint + Prettier / Ruff / gofmt]
- **Package manager:** [e.g., pnpm / uv / go modules]

---

## Development Setup

[TODO: Fill in once the project structure is defined. Example format:]

```bash
# Clone and enter the repo
git clone <repo-url>
cd Unep-evik

# Install dependencies
[TODO: e.g., pnpm install / pip install -e ".[dev]" / go mod download]

# Copy environment config
[TODO: e.g., cp .env.example .env]

# Start dev server / run the app
[TODO: e.g., pnpm dev / uvicorn main:app --reload / go run ./cmd/server]
```

---

## Common Commands

[TODO: Add project-specific commands. Example format:]

| Task              | Command                  |
|-------------------|--------------------------|
| Run tests         | [TODO]                   |
| Lint              | [TODO]                   |
| Format code       | [TODO]                   |
| Build             | [TODO]                   |
| Database migrate  | [TODO]                   |

---

## Coding Conventions

[TODO: Document conventions as they emerge. General defaults to follow until then:]

- Prefer editing existing files over creating new ones.
- Keep changes minimal and focused — avoid unnecessary refactors.
- Do not add comments unless the logic is non-obvious.
- Do not introduce new dependencies without discussing it first.
- Match the style (indentation, naming, patterns) of surrounding code.
- Write tests for any non-trivial logic you add.

---

## Branch & Commit Conventions

- **Branch naming:** `<type>/<short-description>` (e.g., `feat/add-auth`, `fix/null-pointer`)
- **Commit messages:** Use the imperative mood, present tense (e.g., `Add user login endpoint`, not `Added` or `Adding`).
- **PR scope:** One logical change per pull request.

---

## Testing

[TODO: Describe how to run tests, what coverage targets exist, and any test conventions.]

---

## CI/CD

[TODO: Describe the CI pipeline (e.g., GitHub Actions, GitLab CI) once it is configured. Note which checks must pass before merging.]

---

## Environment Variables

[TODO: List all required environment variables and their purpose. Example format:]

| Variable     | Required | Description                  |
|--------------|----------|------------------------------|
| `DATABASE_URL` | Yes    | PostgreSQL connection string |
| `SECRET_KEY`   | Yes    | App secret for signing tokens|

Never commit real secrets. Use `.env.example` for documentation.

---

## Key Files and Entry Points

[TODO: List the most important files for understanding the codebase, e.g.:]

- `[TODO]` — Application entry point
- `[TODO]` — Core business logic
- `[TODO]` — Route/API definitions
- `[TODO]` — Database schema / models

---

## AI Assistant Notes

When working in this repo, AI assistants should:

1. **Read before editing.** Always read a file before modifying it.
2. **Stay in scope.** Only make changes directly related to the task.
3. **Prefer small, reversible commits.** Commit logical units of work.
4. **Ask before adding dependencies.** Do not add packages without confirming with the user.
5. **Keep this file current.** When adding major features or changing conventions, update the relevant sections of this CLAUDE.md.
6. **Follow branch rules.** Work on the branch specified by the task; never push to `main`/`master` directly.

---

*Last updated: 2026-03-01 (initial scaffold — repository is empty)*
