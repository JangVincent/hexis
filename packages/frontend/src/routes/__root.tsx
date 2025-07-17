import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Provider } from "../providers";
import RootLayout from "../components/root-layout";
import Menu from "../components/menu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider>
      <React.Fragment>
        <RootLayout menu={<Menu />}>
          <Outlet />
        </RootLayout>
      </React.Fragment>
    </Provider>
  );
}
