# Contributing

Contributions should be small, reviewable, and reproducible.

## Development workflow

1. Create a focused branch.
2. Make one behavioral change at a time.
3. Add or update tests for the changed behavior.
4. Run `npm test` locally.
5. Open a pull request that explains the problem, the chosen approach, and relevant edge cases.

## Review checklist

- The change is self-contained and defensive.
- New behavior has tests.
- Failure cases are covered, not only happy paths.
- The README remains accurate.
- No credentials, private data, or third-party target information are included.
- Claims in documentation can be verified from the code or tests.
