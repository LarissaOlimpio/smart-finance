import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { FinanceFormData, FinanceItem } from "../types/finance";
export function useFinance(storageKey: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financeItems, setFinanceItems] = useLocalStorage<FinanceItem[]>(
    storageKey,
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itensToEdit, setItensToEdit] = useState<FinanceItem | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(financeItems.length / itemsPerPage);
  const starIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = starIndex + itemsPerPage;
  const currentFinanceItems = financeItems.slice(starIndex, endIndex);
  const totalValue = financeItems
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);

  const handleSave = (data: FinanceFormData) => {
    if (itensToEdit) {
      setFinanceItems((prev) =>
        prev.map((item) =>
          item.id === itensToEdit.id ? { ...data, id: itensToEdit.id } : item,
        ),
      );
    } else {
      const itemWithId = { ...data, id: crypto.randomUUID() };
      setFinanceItems((prev) => [...prev, itemWithId]);
    }
    setIsModalOpen(false);
    setItensToEdit(null);
  };
  const handleDelete = (id: string) => {
    setFinanceItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = (updatedItem: FinanceItem) => {
    setIsModalOpen(true);
    setItensToEdit(updatedItem);
  };
  return {
    isModalOpen,
    setIsModalOpen,
    financeItems,
    currentPage,
    setCurrentPage,
    itensToEdit,
    setItensToEdit,
    totalPages,
    currentFinanceItems,
    handleSave,
    handleDelete,
    handleEdit,
    totalValue,
  };
}
