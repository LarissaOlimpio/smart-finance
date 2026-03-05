import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Outflow {
  id: string;
  title: string;
  amount: number;
  date: string;
}
export const Route = createFileRoute("/outflow")({
  component: OutflowComponent,
});

function OutflowComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outflows, setOutflows] = useLocalStorage<Outflow[]>("outflows", []);
  const handleAddOutflow = (newOutflow: Omit<Outflow, "id">) => {
    const outflowWithId = { ...newOutflow, id: crypto.randomUUID() };
    setOutflows((prev) => [...prev, outflowWithId]);
  };
  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Outflows</h1>
        <Modal
          onSave={handleAddOutflow}
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
        {outflows.map((item) => (
          <tr
            key={item.id}
            className="border-b hover:bg-gray-50 transition-colors"
          >
            <td className="p-4 text-gray-800">{item.title}</td>
            <td className="p-4 text-gray-500 text-sm">
              {new Date(item.date).toLocaleDateString("pt-BR")}
            </td>
            <td className="p-4 text-right font-medium text-orange-600">
              + R${" "}
              {item.amount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}
