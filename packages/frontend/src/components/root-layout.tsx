import React from 'react';
import Menu from './menu';

const MemoizedMenu = React.memo(Menu);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <MemoizedMenu />
      </nav>
      <div>{children}</div>
    </div>
  );
}
