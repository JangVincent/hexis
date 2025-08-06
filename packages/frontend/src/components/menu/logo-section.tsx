import { cn } from '@/lib/tailwind-utils';
import styles from './index.module.css';
import { Link } from '@tanstack/react-router';
import React from 'react';
import Logo from '../logo';

function LogoSection() {
  return (
    <Link
      to='/'
      className={cn(
        'h-16 md:h-32 flex justify-center items-center border-b-2',
        styles.background
      )}
    >
      <Logo
        width={62}
        height={62}
        className='mx-auto relative z-10 md:border-2'
      />
    </Link>
  );
}

export default React.memo(LogoSection);
