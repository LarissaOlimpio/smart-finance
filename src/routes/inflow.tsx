import { createFileRoute } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import { useFinance, type categoryOptions } from "../hooks/useFinance";
import TableComponent from "../components/Table/TableComponent";
import Pagination from "../components/Pagination/Pagination";

export const Route = createFileRoute("/inflow")({
  component: InflowComponent,
});

function InflowComponent() {
  const finance = useFinance("inflows");

  const category: categoryOptions[] = [
    { name: "salary", value: "Salary" },
    { name: "vacation pay", value: "Vacation Pay" },
    { name: "profit sharing", value: "Profit Sharing" },
    { name: "bonus", value: "Bonus" },
    { name: "other", value: "Other" },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Inflows</h1>
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
