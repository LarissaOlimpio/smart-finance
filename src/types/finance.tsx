export interface FinanceItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}
export interface categoryOptions {
  name: string;
  value: string;
}
export type FinanceFormData = Omit<FinanceItem, "id">;
