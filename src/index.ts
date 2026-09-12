import { evaluateAccess, type AccessRequest } from './policy.js';

const cases: AccessRequest[] = [
  { role: 'admin', resource: 'billing', action: 'manage' },
  { role: 'editor', resource: 'article', action: 'update' },
  { role: 'editor', resource: 'billing', action: 'read' },
  { role: 'viewer', resource: 'article', action: 'delete' },
  { role: 'unknown', resource: 'article', action: 'read' },
];

for (const testCase of cases) {
  const decision = evaluateAccess(testCase);
  const status = decision.allowed ? 'ALLOW' : 'DENY';
  console.log(`${status} ${decision.role} -> ${decision.resource}:${decision.action} (${decision.reason})`);
}
