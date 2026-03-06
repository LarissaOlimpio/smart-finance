import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TableComponent from "../components/Table/TableComponent";
import Pagination from "../components/Pagination/Pagination";

interface Outflow {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}
interface categoryOptions {
  name: string;
  value: string;
}
export const Route = createFileRoute("/outflow")({
  component: OutflowComponent,
});

function OutflowComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outflows, setOutflows] = useLocalStorage<Outflow[]>("outflows", []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(outflows.length / itemsPerPage);
  const starIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = starIndex + itemsPerPage;
  const currentOutflows = outflows.slice(starIndex, endIndex);

  const category: categoryOptions[] = [
    { name: "groceries", value: "Groceries" },
    { name: "utilities", value: "Utilities" },
    { name: "entertainment", value: "Entertainment" },
    { name: "transportation", value: "Transportation" },
    { name: "other", value: "Other" },
  ];
  const handleAddOutflow = (newOutflow: Omit<Outflow, "id">) => {
    const outflowWithId = { ...newOutflow, id: crypto.randomUUID() };
    setOutflows((prev) => [...prev, outflowWithId]);
  };
  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Outflows</h1>
        <Modal
          onSave={handleAddOutflow}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          categoryOptions={category}
          triggerText="Add Outflow"
          title="Add New Outflow"
          description="Fill in the details for the new outflow."
          colorButton="orange"
        />
      </div>
      <div>
        {outflows.length === 0 && <p>No outflows yet</p>}
        <TableComponent data={currentOutflows} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
