import type { RoutePath } from '@/lib/route-type';

import { Link, useMatchRoute } from '@tanstack/react-router';

export default function MenuItem({
  to,
  label,
}: {
  to: RoutePath;
  label: string;
}) {
  const matchRouter = useMatchRoute();

  const active = matchRouter({
    to,
  });

  return (
    <Link to={to}>
      {label} {active && '(current)'}
    </Link>
  );
}
