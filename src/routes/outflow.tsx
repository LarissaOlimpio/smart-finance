import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../components/Modal/Modal";

export const Route = createFileRoute("/outflow")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Outflows</h1>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          triggerText="Add Outflow"
          title="Add New Outflow"
          description="Fill in the details for the new outflow."
          colorButton="orange"
        />
      </div>
      <div>
        <p>No outflows yet(table)</p>
      </div>
    </div>
  );
}
