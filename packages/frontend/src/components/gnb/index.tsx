import MenuItem from './menu-item';
import { MENU_ITEMS } from './config';
import { Link } from '@tanstack/react-router';

function Gnb() {
  return (
    <div>
      <Link to='/'>
        <h1>Hexis</h1>
      </Link>
      <nav>
        <menu>
          {MENU_ITEMS.map(item => (
            <li key={item.to}>
              <MenuItem to={item.to} label={item.label} />
            </li>
          ))}
        </menu>
      </nav>
      <hr />
    </div>
  );
}

export default Gnb;
