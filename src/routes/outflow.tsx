import { createFileRoute } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import { useFinance } from "../hooks/useFinance";
import type { categoryOptions } from "../types/finance";
import TableComponent from "../components/Table/TableComponent";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import SearchItem from "../components/SearchItem";

export const Route = createFileRoute("/outflow")({
  component: OutflowComponent,
});

function OutflowComponent() {
  const finance = useFinance("outflows");
  const [searchTerm, setSearchTerm] = useState("");
  const category: categoryOptions[] = [
    { name: "groceries", value: "Groceries" },
    { name: "utilities", value: "Utilities" },
    { name: "entertainment", value: "Entertainment" },
    { name: "transportation", value: "Transportation" },
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / itemsPerPage),
  );

  useEffect(() => {
    if (finance.currentPage > totalPages) {
      finance.setCurrentPage(totalPages);
    }
  }, [finance.currentPage, finance.setCurrentPage, totalPages]);

  const startIndex = (finance.currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-8">
      <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex flex-1 flex-col items-center gap-5 sm:flex-row sm:items-center sm:items-start">
          <h1 className="text-3xl font-bold text-gray-900">Outflows</h1>
          <SearchItem value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="rounded-sm bg-gray-200 px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-700">
            Total Outflows: ${finance.totalValue}
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
            triggerText="Add Outflow"
            title="Add New Outflow"
            description="Fill in the details for the new outflow."
            colorButton="orange"
          />
        </div>
      </div>
      <div>
        {finance.financeItems.length === 0 && <p>No outflows yet</p>}
        <TableComponent
          badgeColor="orange"
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
