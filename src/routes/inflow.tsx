import { createFileRoute } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import { useFinance } from "../hooks/useFinance";
import type { categoryOptions } from "../types/finance";
import TableComponent from "../components/Table/TableComponent";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import SearchItem from "../components/SearchItem";

export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  const finance = useFinance("inflows");
  const [searchTerm, setSearchTerm] = useState("");

  const category: categoryOptions[] = [
    { name: "salary", value: "Salary" },
    { name: "vacation pay", value: "Vacation Pay" },
    { name: "profit sharing", value: "Profit Sharing" },
    { name: "bonus", value: "Bonus" },
    { name: "other", value: "Other" },
  ];

  const itemsPerPage = 10;

  const filteredItems = finance.financeItems.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();

    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.date.toLowerCase().includes(term) ||
      item.amount.toString().toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    if (finance.currentPage > totalPages) {
      finance.setCurrentPage(totalPages);
    }
  }, [finance.currentPage, finance.setCurrentPage, totalPages]);

  const startIndex = (finance.currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-8">
      <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inflows</h1>
        </div>

        <SearchItem value={searchTerm} onChange={setSearchTerm} />

        <div className="bg-gray-100 p-2 rounded-lg border border-gray-300 text-gray-600">
          <p>Total Inflows: ${finance.totalValue}</p>
        </div>

        <Modal
          key={finance.itensToEdit?.id ?? "new"}
          onSave={finance.handleSave}
          isOpen={finance.isModalOpen}
          setIsOpen={(open) => {
            finance.setIsModalOpen(open);
            if (!open) {
              finance.setItensToEdit(null);
            }
          }}
          itensToEdit={finance.itensToEdit}
          categoryOptions={category}
          triggerText="Add Inflow"
          title={finance.itensToEdit ? "Edit Inflow" : "Add Inflow"}
          description="Fill in the details for the new inflow."
          colorButton="green"
        />
      </div>
      <div>
        {finance.financeItems.length === 0 && <p>No inflows yet</p>}
        <TableComponent
          badgeColor="green"
          data={currentItems}
          onDelete={finance.handleDelete}
          onEdit={finance.handleEdit}
        />
      </div>
      <Pagination
        currentPage={finance.currentPage}
        totalPages={totalPages}
        onPageChange={finance.setCurrentPage}
      />
    </div>
  );
}
