import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/sidebar/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  ),
});
