# Contributing Guidelines

Thank you for investing your time in contributing to this NewBee! To ensure a smooth, transparent, and scalable development workflow, we strictly adhere to industry-standard Git conventions. 

Please read this guide fully before starting your work.

---

## 1. Branch Naming Conventions

Never work directly on the `main` or `develop` branches. All work must be isolated in a dedicated branch branched off from the target deployment branch.

### Format
```text
<type>/<short-description-in-kebab-case>
```

### Allowed Types

* **`feat/`** — A new feature or enhancement *(e.g., `feat/user-jwt-auth`)*
* **`fix/`** — A bug fix *(e.g., `fix/header-mobile-overflow`)*
* **`docs/`** — Documentation changes only *(e.g., `docs/api-onboarding-guide`)*
* **`refactor/`** — Code restructuring without changing external behavior *(e.g., `refactor/user-service-class`)*
* **`perf/`** — Changes that strictly improve performance *(e.g., `perf/image-lazy-loading`)*
* **`test/`** — Adding or correcting automated tests *(e.g., `test/checkout-flow-unit`)*
* **`chore/`** — Tooling, CI/CD, dependency upgrades, or configuration *(e.g., `chore/upgrade-nextjs-14`)*
* **`hotfix/`** — Urgent patch intended directly for production *(e.g., `hotfix/stripe-webhook-crash`)*

### Rules

1. Use **lowercase** exclusively.
2. Separate words with **hyphens** (`-`), never underscores (`_`) or camelCase.
3. Keep descriptions under 5 words.
4. If your branch corresponds to an issue/ticket, append the ticket ID: `feat/ISSUE-402-oauth-login`.

---

## 2. Commit Message Conventions

We follow the **[Conventional Commits Specification](https://www.conventionalcommits.org/)**. This allows our CI/CD pipelines to automatically generate semver version bumps and changelogs.

### Format

```text
<type>(<optional-scope>): <short summary>

[optional body explaining the 'why']
```

### The 4 Golden Rules of Commit Summaries

1. **Use the imperative present tense:** Write *"add auth service"*, **never** *"added auth service"* or *"adds auth service"*.
2. **Do not capitalize** the first letter of the summary.
3. **No period (`.`)** at the end of the summary.
4. Keep the top summary line **under 50 characters**.

### Examples

* **Good:** `feat(cart): implement local storage persistence`
* **Good:** `fix(auth): resolve infinite redirect loop on expired token`
* **Good:** `chore(deps): bump tailwindcss from 3.4.0 to 3.4.1`
* **Bad:** ~~`Fixed the login bug.`~~ *(Wrong tense, capitalized, ends in period, missing type)*
* **Bad:** ~~`WIP`~~ *(Provides zero historical context)*

---

## 3. Pull Request (PR) Guidelines

### A. PR Title

Your PR Title **must** follow the exact same format as a single Conventional Commit. If your PR introduces one main feature, mirror your primary commit message:

> **`feat(dashboard): add revenue metric breakdown chart`**

---

### B. PR Body Template

When opening a PR, your description must be thorough. *Copy the template below into your PR description box:*

```markdown
## Description
<!-- Provide a clear, concise overview of what this PR accomplishes and WHY it was necessary. -->


## Related Issue(s)
<!-- Link any tracked issues. Example: "Closes #142" or "Relates to #88" -->


## Type of Change
<!-- Mark the appropriate box with an 'x' -->
- [ ] 🚀 **New Feature** (non-breaking change introducing new functionality)
- [ ] 🐛 **Bug Fix** (non-breaking fix for a known issue)
- [ ] 💥 **Breaking Change** (fix or feature that causes existing functionality to break)
- [ ] ♻️ **Refactor** (code change that neither fixes a bug nor adds a feature)
- [ ] 📝 **Documentation** (updates to README, inline docs, or contributor guides)
- [ ] 🤖 **Chore / Tooling** (CI pipelines, package bumps, build scripts)

## Proposed Changes
<!-- Bullet point the technical implementations made under the hood -->
* Introduced `AuthGuard` middleware to protect `/app` routes.
* Stripped legacy session cookies in favor of Bearer tokens.
* Updated the Axios interceptor to catch `401 Unauthorized` states.

## Verification & QA Instructions
<!-- Step-by-step instructions for the Reviewer to manually test your code -->
1. Pull branch locally and run `npm run dev`.
2. Navigate to `http://localhost:3000/protected-route` while logged out.
3. **Expectation:** User should be instantly bounced to `/login?redirect=/protected-route`.

## Screenshots / Screen Recordings (If UI touched)
| Before | After |
| :---: | :---: |
| *Drop image here* | *Drop image here* |

***

### 📦 Codebase Impact Summary
* **Total Files Touched:** `[e.g., 6]`
* **Files Created:** `[Count]`
* **Files Modified:** `[Count]`
* **Files Deleted:** `[Count]`
* **Primary Sub-systems Affected:** `[e.g., Auth, Database Models, Frontend Navbar]`

```

---

## 4. The Code Review Process

1. **Size Matters:** Keep PRs small. PRs touching `>15 files` or sitting at `>500 net lines of code` will generally be asked to be reviewed and asked to be split up, as large diffs statistically result in rubber-stamp reviews that miss bugs.
2. **Draft State:** If your work is not ready for a pair of eyes, open the PR as a **Draft**. Do not tag reviewers until you mark it *“Ready for Review”*.
3. **Addressing Feedback:** When a reviewer requests a change, make the fix in a new commit (do not rebase/force-push away the old commit while a review is active, as it breaks the reviewer's point of reference). Once resolved, re-request review.
