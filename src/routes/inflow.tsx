import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../components/Modal/Modal";

export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Inflows</h1>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          triggerText="Add Inflow"
          title="Add New Inflow"
          description="Fill in the details for the new inflow."
          colorButton="green"
        />
      </div>
      <div>
        <p>No inflows yet(table)</p>
      </div>
    </div>
  );
}
