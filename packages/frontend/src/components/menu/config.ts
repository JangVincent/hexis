import type { RoutePath } from '@/lib/route-type';
import { IconHome, IconSearch, IconSignIn } from '@/components/icon';

export const MENU_ITEMS: {
  to: RoutePath;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    to: '/',
    icon: IconHome,
    label: 'HOME',
  },
  {
    to: '/search',
    icon: IconSearch,
    label: 'SEARCH',
  },
  {
    to: '/account/sign-in',
    icon: IconSignIn,
    label: 'SIGN IN',
  },
];
