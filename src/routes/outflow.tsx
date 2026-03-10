import { createFileRoute } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import { useFinance } from "../hooks/useFinance";
import type { categoryOptions } from "../types/finance";
import TableComponent from "../components/Table/TableComponent";
import Pagination from "../components/Pagination/Pagination";

export const Route = createFileRoute("/outflow")({
  component: OutflowComponent,
});

function OutflowComponent() {
  const finance = useFinance("outflows");

  const category: categoryOptions[] = [
    { name: "groceries", value: "Groceries" },
    { name: "utilities", value: "Utilities" },
    { name: "entertainment", value: "Entertainment" },
    { name: "transportation", value: "Transportation" },
    { name: "other", value: "Other" },
  ];

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-8">
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <div>
          <h1 className="text-2xl font-bold">Outflows</h1>
          <p>Total: ${finance.totalValue}</p>
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
      <div>
        {finance.financeItems.length === 0 && <p>No outflows yet</p>}
        <TableComponent
          badgeColor="orange"
          data={finance.currentFinanceItems}
          onDelete={finance.handleDelete}
          onEdit={finance.handleEdit}
        />
      </div>
      <Pagination
        currentPage={finance.currentPage}
        totalPages={finance.totalPages}
        onPageChange={finance.setCurrentPage}
      />
    </div>
  );
}
