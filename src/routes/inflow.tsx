import { createFileRoute } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex direction-column md:direction-row items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Inflows</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="text-xl" />
          Add Inflow
        </button>
      </div>
      <div>
        <p>No inflows yet</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Inflow</h2>
            <p>Modal content goes here</p>
          </div>
        </div>
      )}
    </div>
  );
}
