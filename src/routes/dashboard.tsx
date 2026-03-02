import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao painel financeiro!</p>
    </div>
  );
}
