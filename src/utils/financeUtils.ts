import { parseISO, format, isValid, compareAsc } from "date-fns";
import type { FinanceItem } from "../types/finance";

export const getMonthKey = (dateString: string): string => {
  const date = parseISO(dateString);
  if (!isValid(date)) return "Other";

  return format(date, "yyyy-MM");
};

export const formatMonthLabel = (monthKey: string): string => {
  if (monthKey === "Other") return "Other";

  const date = parseISO(`${monthKey}-01`);
  return format(date, "MMM yy");
};

export const calculateFinanceStats = (
  inflows: FinanceItem[],
  outflows: FinanceItem[],
) => {
  const totalInflows = inflows.reduce((acc, item) => acc + item.amount, 0);
  const totalOutflows = outflows.reduce((acc, item) => acc + item.amount, 0);
  const currentBalance = totalInflows - totalOutflows;

  const savingsRate =
    totalInflows > 0
      ? Number(
          (
            ((currentBalance > 0 ? currentBalance : 0) / totalInflows) *
            100
          ).toFixed(1),
        )
      : 0;

  const categoryMap: Record<string, number> = {};
  outflows.forEach((item) => {
    const key = item.category || "Other";
    categoryMap[key] = (categoryMap[key] ?? 0) + item.amount;
  });

  const trendMap: Record<
    string,
    { month: string; inflow: number; outflow: number }
  > = {};

  const processItems = (items: FinanceItem[], type: "inflow" | "outflow") => {
    items.forEach((item) => {
      const key = getMonthKey(item.date);
      if (!trendMap[key]) {
        trendMap[key] = { month: key, inflow: 0, outflow: 0 };
      }
      trendMap[key][type] += item.amount;
    });
  };

  processItems(inflows, "inflow");
  processItems(outflows, "outflow");

  const monthlyTrends = Object.values(trendMap)
    .sort((a, b) =>
      compareAsc(parseISO(`${a.month}-01`), parseISO(`${b.month}-01`)),
    )
    .map((entry) => ({
      ...entry,
      monthLabel: formatMonthLabel(entry.month),
    }));

  return {
    totalInflows,
    totalOutflows,
    currentBalance,
    savingsRate,
    outflowByCategory: Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    })),
    monthlyTrends,
  };
};
