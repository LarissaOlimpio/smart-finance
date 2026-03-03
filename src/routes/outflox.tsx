import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/outflox")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Outflow</h1>
      <p>Gerencie suas saídas financeiras aqui.</p>
    </div>
  );
}
