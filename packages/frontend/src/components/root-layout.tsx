import React from 'react';
import Gnb from './gnb';

const MemoizedGnb = React.memo(Gnb);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <MemoizedGnb />
      </header>
      <div>{children}</div>
    </div>
  );
}
