# Security Research Hangar

A small, reproducible TypeScript lab for reasoning about authorization rules and evaluating technical answers with explicit rubrics.

## What it does

The project currently contains two self-contained exercises:

1. **Authorization regression lab** — models role/resource/action policies, denies unknown inputs by default, and tests positive and negative access paths.
2. **AI evaluation rubric lab** — scores candidate technical answers against explicit evidence, uncertainty, formatting, and unsupported-claim checks.

Everything runs locally. No third-party targets, credentials, scanners, model APIs, or network access are required.

It demonstrates:

- deterministic authorization-policy evaluation
- deny-by-default behavior
- reusable positive and negative security tests
- edge-case handling for unknown roles, resources, and actions
- rubric-based AI response evaluation
- explicit treatment of unsupported claims and uncertainty
- reproducible verification with automated tests

## Why this exists

Security and AI-evaluation work both benefit from the same discipline: make assumptions explicit, define expected behavior, test edge cases, and produce results another reviewer can reproduce.

The authorization lab turns access-control assumptions into a compact decision matrix. The AI-evaluation lab turns review criteria into a deterministic scoring function instead of relying on vague judgments.

## Quick start

```bash
npm install
npm test
npm run check
```

## Project structure

```text
src/policy.ts               authorization policy model and evaluator
src/index.ts                reproducible verification runner
src/ai-evaluation.ts        deterministic AI-response evaluation rubric
tests/policy.test.ts        authorization regression tests
tests/ai-evaluation.test.ts AI-evaluation edge-case tests
```

## Security principles demonstrated

1. **Deny by default** — missing authorization rules never grant access.
2. **Least privilege** — permissions are explicit and narrow.
3. **Test both allow and deny paths** — negative authorization tests are first-class.
4. **Evidence over assertion** — evaluation rewards claims tied to evidence.
5. **Explicit uncertainty** — reviewers should distinguish known facts from uncertain conclusions.
6. **Deterministic output** — identical inputs produce identical results.
7. **No hidden environment dependency** — the lab runs locally with a standard Node/TypeScript toolchain.

## Scope

This repository is an educational and portfolio project for defensive application-security engineering and AI evaluation. It does not target third-party systems and does not contain offensive automation.

## Contributing

Small, testable improvements are welcome. Please keep examples self-contained and defensive, add tests for behavioral changes, and explain the reasoning behind new rules or rubric dimensions.
