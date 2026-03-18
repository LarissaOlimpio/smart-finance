import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { FinanceItem } from "../types/finance";
import { calculateFinanceStats } from "../utils/financeUtils";

export function useDashboardData() {
  const [inflows] = useLocalStorage<FinanceItem[]>("inflows", []);
  const [outflows] = useLocalStorage<FinanceItem[]>("outflows", []);

  const stats = useMemo(() => {
    return calculateFinanceStats(inflows, outflows);
  }, [inflows, outflows]);

  return {
    ...stats,
    isEmpty: inflows.length === 0 && outflows.length === 0,
    totalItems: inflows.length + outflows.length,
  };
}
