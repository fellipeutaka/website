# Feedback Loops for AI Agents

AI agents don't get frustrated by repetition. When code fails type checking or
tests, the agent retries. This makes feedback loops extremely powerful.

## Priority Order

1. **TypeScript** — free, catches most errors without running code
2. **Automated tests** — catches logical errors TypeScript misses
3. **Pre-commit hooks** — enforces all checks before every commit
4. **Code quality (linting + formatting)** — auto-fixes style, catches bugs

## 1. TypeScript Type Checking

Add a `typecheck` script to `package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

If using a monorepo with Turborepo:

```json
{
  "scripts": {
    "typecheck": "turbo typecheck"
  }
}
```

## 2. Automated Tests

### Unit / Integration Tests

Ask the user which runner they use or prefer:

**Vitest** (recommended for Vite-based projects):

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Jest**:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

**Bun** (built-in test runner, zero config):

```json
{
  "scripts": {
    "test": "bun test"
  }
}
```

### E2E Tests (frontend)

**Playwright** (recommended — headless by default, great for CI/AI):

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

**Cypress**:

```json
{
  "scripts": {
    "test:e2e": "cypress run"
  }
}
```

Focus on integration-style tests that verify behavior through public interfaces.
AI agents can run these repeatedly to validate their changes.

## 3. Pre-Commit Hooks

Pre-commit hooks are the most powerful feedback loop for AI agents — they block
bad commits and the agent gets an error message to self-correct.

Ask the user which tool they use or prefer:

### Option A: Lefthook (recommended — fast, single binary, no dependencies)

Lefthook is a fast Git hooks manager written in Go. Unlike Husky + lint-staged
(two tools), Lefthook handles both hook management and staged file filtering in
a single tool via `lefthook.yml`.

#### Install

```bash
# pnpm
pnpm add -D @evilmartians/lefthook
pnpm exec lefthook install

# npm
npm install --save-dev @evilmartians/lefthook
npx lefthook install

# bun
bun add -D @evilmartians/lefthook
bunx lefthook install
```

#### Configure `lefthook.yml`

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: lint
      run: npx oxlint --fix {staged_files}
      glob: "*.{ts,tsx,js,jsx}"
      stage_fixed: true

    - name: format
      run: npx oxfmt {staged_files}
      glob: "*.{ts,tsx,js,jsx,json,css}"
      stage_fixed: true

    - name: typecheck
      run: npm run typecheck

    - name: test
      run: npm run test
```

Key features:
- `{staged_files}` — built-in staged file interpolation (no lint-staged needed)
- `stage_fixed` — re-stages files after auto-fix
- `parallel: true` — runs independent jobs concurrently
- `glob` — filters files per job

### Option B: Husky + lint-staged

Two tools: Husky manages Git hooks, lint-staged runs commands on staged files.

#### Install

```bash
# pnpm
pnpm add -D husky lint-staged
pnpm exec husky init

# npm
npm install --save-dev husky lint-staged
npx husky init

# bun
bun add -D husky lint-staged
bunx husky init
```

#### Configure `.husky/pre-commit`

```bash
npx lint-staged
npm run typecheck
npm run test
```

#### Configure `.lintstagedrc`

```json
{
  "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt --write"],
  "*": "oxfmt --write --no-error-on-unmatched-pattern"
}
```

Adjust commands to match the project's package manager and linter/formatter.

## 4. Code Quality (Linting + Formatting)

Ask the user which toolchain they use or prefer:

### Option A: Oxlint + Oxfmt (recommended — fastest, Rust-based)

Oxlint is a high-performance linter and Oxfmt is a high-performance formatter,
both from the Oxc project. Written in Rust, they are significantly faster than
JavaScript-based alternatives.

#### Install

```bash
# pnpm
pnpm add -D oxlint oxfmt

# npm
npm install --save-dev oxlint oxfmt

# bun
bun add -D oxlint oxfmt
```

#### Initialize configs

```bash
npx oxlint --init    # creates .oxlintrc.json
npx oxfmt --init     # creates .oxfmtrc.json
```

#### Scripts

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

Oxfmt supports `--migrate prettier` and `--migrate biome` to migrate existing
formatter config.

### Option B: Biome (fast, single tool for lint + format)

```bash
pnpm add -D @biomejs/biome
npx biome init
```

```json
{
  "scripts": {
    "lint": "biome check",
    "lint:fix": "biome check --write"
  }
}
```

### Option C: ESLint + Prettier (most mature ecosystem)

```bash
pnpm add -D eslint prettier
```

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "fmt": "prettier --write .",
    "fmt:check": "prettier --check ."
  }
}
```

## The Complete Stack

When all four layers work together:

1. AI writes code
2. AI runs `typecheck` — catches type errors
3. AI runs `test` — catches logic errors
4. AI commits — pre-commit hook runs lint + format + typecheck + tests
5. If anything fails, AI sees error and retries

The agent self-corrects without human intervention. This is what makes AFK
coding (like Ralph) possible.
