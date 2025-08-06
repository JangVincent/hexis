import React from 'react';
import Menu from './menu';

const MemoizedMenu = React.memo(Menu);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='border-2 border-black bg-white w-full max-w-(--max-container-width) overflow-hidden mx-auto min-h-[640px] h-svh box-border flex -gap-1'>
      <div className='border-r-2 basis-(--min-menu-width) md:basis-(--max-menu-width) shrink-0'>
        <MemoizedMenu />
      </div>
      <div className='flex-grow main-container overflow-y-auto no-scrollbar'>
        {children}
      </div>
    </div>
  );
}
