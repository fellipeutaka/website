---
name: ai-repo-setup
description: |
  Set up and optimize repositories for AI coding agents. Creates minimal AGENTS.md,
  CLAUDE.md symlink, docs/REQUIREMENTS.md, docs/BUSINESS-RULES.md, feedback loops,
  and deterministic enforcement (Claude Code hooks, OpenCode plugins). Use when user
  wants to make a repo AI-friendly, set up AGENTS.md/CLAUDE.md, document
  requirements/business rules for AI, add pre-commit hooks for AI workflows, or
  optimize codebase structure for coding agents.
---

# AI Repo Setup

Prepare a repository so AI coding agents can navigate, implement, and verify
changes with minimal friction.

**Core philosophy**: AI agents are new starters with no memory. Every session
starts fresh. The codebase itself — not documentation — is the primary context.
Only document what is undiscoverable and globally relevant.

## Inputs to gather (if missing)

- One-sentence project description (what does this project do?)
- Functional requirements (what the system should do)
- Non-functional requirements (performance, security, scalability constraints)
- Business rules (domain logic, validation rules, constraints)
- Behavioral preferences for agents (see step 4 for what to ask)

## Workflow

### 1. Analyze existing repo

- Read `package.json`, config files, directory structure
- Identify tech stack, package manager, existing scripts
- Check for existing AGENTS.md, CLAUDE.md, docs/
- Note what's already discoverable from source (don't re-document it)

### 2. Create or convert `docs/REQUIREMENTS.md`

If `docs/REQUIREMENTS.md` already exists, ask the user whether to convert it to
the status-based format. Preserve all existing content — only restructure the
format and add status fields. If creating from scratch, interview user or extract
from existing code.

Structure:

```markdown
# Requirements

## Status Reference

| Status | Meaning |
|--------|---------|
| `draft` | Written but not yet reviewed — may still be vague or incomplete |
| `refined` | Reviewed and clarified by user, ready to be implemented |
| `in-progress` | Actively being implemented by the agent |
| `implemented` | Code written by agent, awaiting user review |
| `verified` | User reviewed and approved — source of truth |
| `deferred` | Intentionally postponed, not abandoned |
| `cancelled` | No longer relevant, kept for historical context |

## Functional Requirements

### [Feature Area]

#### FR-001: [Requirement title]
- **Status**: `draft`
- **Description**: [What the system should do]

#### FR-002: [Requirement title]
- **Status**: `verified`
- **Description**: [What the system should do]

## Non-Functional Requirements

### Performance

#### NFR-001: [Constraint title]
- **Status**: `draft`
- **Description**: [Measurable constraint, e.g. "API responses must be < 200ms at p99"]

### Security

#### NFR-002: [Constraint title]
- **Status**: `draft`
- **Description**: [Constraint]

### Scalability

#### NFR-003: [Constraint title]
- **Status**: `draft`
- **Description**: [Constraint]
```

Keep requirements specific, testable, and numbered for traceability. The agent
sets status to `implemented` after completing work; the user sets it to
`verified` after review. Never skip `verified` — `implemented` means the agent
is done, not that the feature is correct.

### 3. Create or convert `docs/BUSINESS-RULES.md`

If `docs/BUSINESS-RULES.md` already exists, ask the user whether to convert it
to the status-based format. Preserve all existing content — only restructure the
format and add status fields. If creating from scratch, interview user or extract
from existing code.

Structure:

```markdown
# Business Rules

## Status Reference

| Status | Meaning |
|--------|---------|
| `draft` | Written but not yet reviewed — may still be vague or incomplete |
| `refined` | Reviewed and clarified by user, ready to be implemented |
| `in-progress` | Actively being implemented by the agent |
| `implemented` | Code written by agent, awaiting user review |
| `verified` | User reviewed and approved — source of truth |
| `deferred` | Intentionally postponed, not abandoned |
| `cancelled` | No longer relevant, kept for historical context |

## [Domain Area]

### BR-001: [Rule name]
- **Status**: `draft`
- **When**: [Trigger condition]
- **Then**: [Expected behavior]
- **Rationale**: [Why this rule exists]

### BR-002: [Rule name]
- **Status**: `verified`
- **When**: [Trigger condition]
- **Then**: [Expected behavior]
- **Rationale**: [Why this rule exists]
```

Focus on domain logic that isn't obvious from code. Number rules for
cross-referencing with tests. Business rules typically reach `verified` only
when both the rule is enforced in code **and** a test explicitly names the rule
ID (e.g. `it("BR-001: ...")`).

### Agent Workflow for Requirements & Business Rules

This is the intended lifecycle for keeping docs in sync with the codebase:

1. **Draft** — user or agent adds a new item with `status: draft`
2. **Refine** — agent clarifies the description until it is specific and
   testable; user confirms; status → `refined`
3. **Implement** — user asks agent to implement a specific ID; agent
   implements it; status → `implemented`
4. **Verify** — user reviews the implementation; if approved, status →
   `verified`; if rejected, status → `in-progress` with a note

The agent must never set status to `verified` — only the user does.
The agent must update status to `implemented` before closing a session.

### 4. Generate minimal `AGENTS.md`

See [references/agents-md-guide.md](references/agents-md-guide.md) for full
principles.

The file must be **as small as possible**. Only include:

1. One-sentence project description
2. Pointers to docs/ with the sync rule (mandatory — without this, the status
   lifecycle is dead on arrival since agents start fresh every session)
3. Behavioral instructions (agent workflow preferences that are undiscoverable
   from source). Ask the user if they have preferences for:
   - **Plan mode**: how agents should present plans (e.g., concise vs detailed,
     listing unresolved questions)
   - **Communication style**: brevity, formality, language
   - **Workflow habits**: any recurring instructions they find themselves
     repeating across sessions

Example:

```markdown
# Project Name

SaaS platform for team retrospectives with real-time collaboration.

## Docs

- `docs/REQUIREMENTS.md` — functional and non-functional requirements
- `docs/BUSINESS-RULES.md` — domain rules and constraints

When implementing features or fixing bugs, update the relevant requirement/rule
status in these docs to keep them synced with the codebase.

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
```

**Do NOT include**: package manager (discoverable from lock files,
`packageManager` field in `package.json`, or enforcement hooks), commands
(discoverable from `package.json` scripts), architecture descriptions, file
listings, framework/library explanations, implementation patterns. These are all
discoverable from source.

### 5. Create `CLAUDE.md` symlink

```bash
ln -s AGENTS.md CLAUDE.md
```

This keeps Claude Code and other tools reading the same instructions.

### 6. Set up feedback loops (optional)

See [references/feedback-loops.md](references/feedback-loops.md) for details.

Ask user which feedback loops to set up:

- [ ] TypeScript `typecheck` script in package.json
- [ ] Test runner (`vitest`, `jest`, `bun test`)
- [ ] E2E tests (`playwright`, `cypress`) — for frontend projects
- [ ] Pre-commit hooks: Lefthook (recommended) or Husky + lint-staged
- [ ] Code quality: Oxlint + Oxfmt (recommended), Biome, or ESLint + Prettier

Pre-commit hooks are the most powerful feedback loop for AI agents — they get
error messages on failed commits and retry automatically.

### 7. Set up deterministic enforcement (optional)

See [references/deterministic-enforcement.md](references/deterministic-enforcement.md)
for details.

Ask user which agent tools they use and set up enforcement for each:

- **Claude Code**: `PreToolUse` hooks in `.claude/settings.json` (bash scripts)
- **OpenCode**: plugins in `.opencode/plugins/` (TypeScript/JavaScript modules)

Ask about both tools — users may use one or both. Set up enforcement for every
tool the user opts into.

Common enforcement rules:

- Enforce correct package manager (block `npm`, `yarn`, `bun`, `deno` if using `pnpm`)
- Block dangerous git commands (`git push --force`, `git reset --hard`)
- Block specific CLI patterns
- Protect sensitive files (`.env`, credentials)

Enforcement saves instruction budget and is deterministic — rules cannot be
ignored by the agent. It also makes the package manager discoverable by agents
(they see the error message when blocked), which is why it doesn't need to be
in AGENTS.md.

## Deliverables

- [ ] `docs/REQUIREMENTS.md` — numbered functional + non-functional requirements
- [ ] `docs/BUSINESS-RULES.md` — numbered business rules with triggers/behavior
- [ ] `AGENTS.md` — minimal, hand-crafted, globally relevant only
- [ ] `CLAUDE.md` — symlink to AGENTS.md
- [ ] Feedback loops configured (if opted in)
- [ ] Deterministic enforcement configured (if opted in)

## Anti-patterns to avoid

- **Bloated AGENTS.md** — every line costs tokens on every session
- **Documenting the discoverable** — agents read `package.json` scripts, lock
  files (`pnpm-lock.yaml`, `yarn.lock`, etc.), `packageManager` field, config
  files, and imports. Don't repeat what they'll find in seconds.
- **Listing package manager or commands** — discoverable from lock files,
  `packageManager` field in `package.json`, and enforcement hooks
- **File path references** — paths change; describe capabilities instead
- **Auto-generated init files** — stale immediately, actively mislead agents
- **Global rules for local concerns** — use progressive disclosure or skills instead
- **Missing docs sync rule** — without telling agents to update requirement/rule
  statuses, the entire lifecycle system is unused
