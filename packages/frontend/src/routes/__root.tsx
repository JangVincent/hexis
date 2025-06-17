import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Provider } from "../providers";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider>
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    </Provider>
  );
}
