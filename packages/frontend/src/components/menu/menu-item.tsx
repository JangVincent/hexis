import type { RoutePath } from '@/lib/route-type';
import { cn } from '@/lib/tailwind-utils';
import { Link, useMatchRoute } from '@tanstack/react-router';
import React from 'react';

export default function MenuItem({
  to,
  icon: Icon,
  label,
}: {
  to: RoutePath;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) {
  const matchRoute = useMatchRoute();

  const active = matchRoute({
    from: to,
    to,
  });

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center justify-center md:justify-start gap-3 p-4 hover:bg-black focus:bg-black group',
        active && 'bg-black text-white'
      )}
    >
      <Icon
        className={cn(
          'size-6 md:size-8 group-hover:text-white group-focus:text-white',
          active && 'text-white'
        )}
      />
      <span className='hidden md:block text-xl font-bold group-hover:text-white group-focus:text-white'>
        {label}
      </span>
    </Link>
  );
}
