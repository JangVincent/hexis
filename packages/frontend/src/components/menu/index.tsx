import { useMemo } from 'react';

import HealthIndicator from '@/features/health/components/health-indicator';
import LogoSection from './logo-section';
import MenuItem from './menu-item';
import { MENU_ITEMS } from './config';

function Menu() {
  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map(item => (
        <li key={item.to}>
          <MenuItem to={item.to} icon={item.icon} label={item.label} />
        </li>
      )),
    []
  );

  return (
    <nav className='flex flex-col h-full'>
      <LogoSection />
      <menu className='[&>li]:border-b-2'>{menuItems}</menu>
      <div className='flex-grow flex flex-col justify-end'>
        <HealthIndicator />
      </div>
    </nav>
  );
}

export default Menu;
