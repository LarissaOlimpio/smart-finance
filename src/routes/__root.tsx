import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <div>
      <Sidebar></Sidebar>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
