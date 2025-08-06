import { IconHome, IconSearch, IconSignIn } from '../icon';

import HealthIndicator from '@/features/health/components/health-indicator';
import LogoSection from './logo-section';
import { MenuItem } from './menu-item';

function Menu() {
  return (
    <nav className='flex flex-col h-full'>
      <LogoSection />
      <menu className='[&>li]:border-b-2'>
        <li>
          <MenuItem to='/' icon={IconHome} label='HOME' />
        </li>
        <li>
          <MenuItem to='/search' icon={IconSearch} label='SEARCH' />
        </li>
        <li>
          <MenuItem to='/account/sign-in' icon={IconSignIn} label='SIGN IN' />
        </li>
      </menu>
      <div className='flex-grow flex flex-col justify-end'>
        <HealthIndicator />
      </div>
    </nav>
  );
}

export default Menu;
