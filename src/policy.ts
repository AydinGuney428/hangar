export type Role = 'admin' | 'editor' | 'viewer';
export type Resource = 'article' | 'billing';
export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage';

export interface AccessRequest {
  role: string;
  resource: string;
  action: string;
}

export interface AccessDecision extends AccessRequest {
  allowed: boolean;
  reason: string;
}

type Policy = Readonly<Record<Role, Readonly<Partial<Record<Resource, readonly Action[]>>>>>;

export const policy: Policy = {
  admin: {
    article: ['read', 'create', 'update', 'delete'],
    billing: ['read', 'manage'],
  },
  editor: {
    article: ['read', 'create', 'update'],
  },
  viewer: {
    article: ['read'],
  },
};

const roles = new Set<string>(Object.keys(policy));
const resources = new Set<string>(['article', 'billing']);
const actions = new Set<string>(['read', 'create', 'update', 'delete', 'manage']);

export function evaluateAccess(request: AccessRequest): AccessDecision {
  const { role, resource, action } = request;

  if (!roles.has(role)) {
    return { ...request, allowed: false, reason: 'unknown role: denied by default' };
  }

  if (!resources.has(resource)) {
    return { ...request, allowed: false, reason: 'unknown resource: denied by default' };
  }

  if (!actions.has(action)) {
    return { ...request, allowed: false, reason: 'unknown action: denied by default' };
  }

  const rolePolicy = policy[role as Role];
  const allowedActions = rolePolicy[resource as Resource] ?? [];
  const allowed = allowedActions.includes(action as Action);

  return {
    ...request,
    allowed,
    reason: allowed ? 'explicit policy match' : 'no explicit permission: denied by default',
  };
}
