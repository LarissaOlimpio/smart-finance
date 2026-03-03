import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Inflow</h1>
      <p>Gerencie suas entradas financeiras aqui.</p>
    </div>
  );
}
