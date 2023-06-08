const mapping: Record<string, string> = {
  courses: 'course',
  mentorships: 'mentorship',
  'mentorship-purchases': 'mentorship_purchase',
  subscriptions: 'subscription',
  teams: 'team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
