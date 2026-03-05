import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TableComponent from "../components/Table/TableComponent";

interface Inflow {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inflows, setInflows] = useLocalStorage<Inflow[]>("inflows", []);
  const handleAddInflow = (newInflow: Omit<Inflow, "id">) => {
    const inflowWithId = { ...newInflow, id: crypto.randomUUID() };
    setInflows((prev) => [...prev, inflowWithId]);
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Inflows</h1>
        <Modal
          onSave={handleAddInflow}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          triggerText="Add Inflow"
          title="Add New Inflow"
          description="Fill in the details for the new inflow."
          colorButton="green"
        />
      </div>
      <div>
        {inflows.length === 0 && <p>No inflows yet</p>}
        <TableComponent data={inflows} />
      </div>
    </div>
  );
}
