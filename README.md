# Security Research Hangar

A small, reproducible TypeScript lab for reasoning about authorization rules and catching access-control regressions before they reach production.

## What it does

The project models a simple role/resource/action policy and evaluates access decisions against explicit expectations. It is intentionally local and self-contained: no external targets, credentials, scanners, or network access are involved.

It demonstrates:

- deterministic authorization-policy evaluation
- deny-by-default behavior
- reusable test cases for positive and negative access paths
- edge-case handling for unknown roles, resources, and actions
- a small CLI-style verification runner
- automated tests with Node's built-in test runner

## Why this exists

Authorization bugs often come from assumptions that are never written down. This lab turns those assumptions into a compact decision matrix that can be reviewed and tested. The goal is to make security reasoning reproducible: a policy change should either preserve the expected decisions or produce a failing test that explains the regression.

## Quick start

```bash
npm install
npm test
npm run check
```

## Example policy

The included example uses three roles (`admin`, `editor`, `viewer`), two resources (`article`, `billing`) and a small set of actions. Unknown inputs are denied.

## Project structure

```text
src/policy.ts        policy model and evaluator
src/index.ts         reproducible verification runner
tests/policy.test.ts regression tests
```

## Security principles demonstrated

1. **Deny by default** — missing rules never grant access.
2. **Least privilege** — permissions are explicit and narrow.
3. **Test both allow and deny paths** — negative authorization tests are first-class.
4. **Deterministic output** — the same policy and input always produce the same decision.
5. **No hidden environment dependency** — the lab runs locally with a standard Node/TypeScript toolchain.

## Scope

This repository is an educational and portfolio project for defensive application-security engineering. It does not target third-party systems.
