import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Provider } from '../providers';
import RootLayout from '../components/root-layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider>
      <React.Fragment>
        <RootLayout>
          <Outlet />
        </RootLayout>
      </React.Fragment>
    </Provider>
  );
}
