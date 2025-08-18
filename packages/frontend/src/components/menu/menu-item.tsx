import type { RoutePath } from '@/lib/route-type';

import { Link, useMatchRoute } from '@tanstack/react-router';
import React from 'react';

export default function MenuItem({
  to,
  label,
}: {
  to: RoutePath;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
