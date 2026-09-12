import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAccess } from '../src/policy.js';

test('admin can manage billing', () => {
  const result = evaluateAccess({ role: 'admin', resource: 'billing', action: 'manage' });
  assert.equal(result.allowed, true);
});

test('editor cannot read billing without an explicit rule', () => {
  const result = evaluateAccess({ role: 'editor', resource: 'billing', action: 'read' });
  assert.equal(result.allowed, false);
  assert.match(result.reason, /denied by default/);
});

test('viewer can read articles but cannot delete them', () => {
  assert.equal(evaluateAccess({ role: 'viewer', resource: 'article', action: 'read' }).allowed, true);
  assert.equal(evaluateAccess({ role: 'viewer', resource: 'article', action: 'delete' }).allowed, false);
});

test('unknown roles are denied', () => {
  const result = evaluateAccess({ role: 'guest', resource: 'article', action: 'read' });
  assert.equal(result.allowed, false);
  assert.equal(result.reason, 'unknown role: denied by default');
});

test('unknown resources are denied', () => {
  const result = evaluateAccess({ role: 'admin', resource: 'secrets', action: 'read' });
  assert.equal(result.allowed, false);
  assert.equal(result.reason, 'unknown resource: denied by default');
});

test('unknown actions are denied', () => {
  const result = evaluateAccess({ role: 'admin', resource: 'article', action: 'publish' });
  assert.equal(result.allowed, false);
  assert.equal(result.reason, 'unknown action: denied by default');
});
