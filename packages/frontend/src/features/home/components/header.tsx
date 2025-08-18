import { Link } from '@tanstack/react-router';
import React from 'react';

function Header() {
  return (
    <header>
      <h1>Hide Your Text Behind a Price Tag</h1>
      <p>Sell Anything — As Long As It's Text</p>
      <Link to='/account/sign-in'>
        <span>Start selling</span>
      </Link>
    </header>
  );
}

export default React.memo(Header);
