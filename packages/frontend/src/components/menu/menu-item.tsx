import { Link } from '@tanstack/react-router';
import React from 'react';

export function MenuItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <Link
      to={to}
      className='flex items-center justify-center md:justify-start gap-3 p-4 hover:bg-black focus:bg-black group'
    >
      <Icon className='size-6 md:size-8 group-hover:text-white group-focus:text-white' />
      <span className='hidden md:block text-xl font-bold group-hover:text-white group-focus:text-white'>
        {label}
      </span>
    </Link>
  );
}
