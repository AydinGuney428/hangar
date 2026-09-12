import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCandidate } from '../src/ai-evaluation.js';

test('passes a well-grounded candidate answer', () => {
  const result = evaluateCandidate({
    answer: 'The finding is supported by the provided reproduction steps.',
    citesEvidence: true,
    acknowledgesUncertainty: true,
    followsRequiredFormat: true,
    containsUnsupportedClaim: false,
  });

  assert.equal(result.score, 100);
  assert.equal(result.passed, true);
});

test('rejects unsupported claims even when other checks pass', () => {
  const result = evaluateCandidate({
    answer: 'This is definitely exploitable in every environment.',
    citesEvidence: true,
    acknowledgesUncertainty: true,
    followsRequiredFormat: true,
    containsUnsupportedClaim: true,
  });

  assert.equal(result.score, 75);
  assert.equal(result.passed, false);
});

test('scores format and evidence failures deterministically', () => {
  const result = evaluateCandidate({
    answer: 'Short answer.',
    citesEvidence: false,
    acknowledgesUncertainty: true,
    followsRequiredFormat: false,
    containsUnsupportedClaim: false,
  });

  assert.equal(result.score, 45);
  assert.equal(result.passed, false);
});
