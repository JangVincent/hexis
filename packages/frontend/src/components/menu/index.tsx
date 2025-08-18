import { useMemo } from 'react';

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

  return <menu>{menuItems}</menu>;
}

export default Menu;
