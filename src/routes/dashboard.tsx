import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import { useDashboardData } from "../hooks/useDashboardData";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import { CATEGORY_COLORS, CHART_COLORS } from "../constants/finance";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const {
    totalInflows,
    totalOutflows,
    currentBalance,
    savingsRate,
    outflowByCategory,
    inflowByCategory,
    monthlyTrends,
  } = useDashboardData();

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-8">
      <header className="mb-8 flex flex-col items-center gap-1 sm:items-start">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, Lari!</h1>
        <p className="text-sm text-slate-500">Finance overview.</p>
      </header>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Inflow"
          value={totalInflows}
          currency
          indicatorColor="bg-sky-200"
        />
        <SummaryCard
          title="Outflow"
          value={totalOutflows}
          currency
          indicatorColor="bg-rose-200"
        />
        <SummaryCard
          title="Balance"
          value={currentBalance}
          currency
          indicatorColor="bg-emerald-200"
        />
        <SummaryCard
          title="Savings"
          value={savingsRate}
          suffix="%"
          indicatorColor="bg-amber-200"
        />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <ChartContainer title="Outflow by Category">
          <PieChart>
            <Pie
              data={outflowByCategory}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={5}
            >
              {outflowByCategory.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.Other}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>

        <ChartContainer title="Inflow by Category">
          <PieChart>
            <Pie
              data={inflowByCategory}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={5}
            >
              {inflowByCategory.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.Other}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
      </div>
      <div>
        <ChartContainer title="Monthly Trends">
          <BarChart data={monthlyTrends}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={CHART_COLORS.grid}
            />
            <XAxis
              dataKey="monthLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: "#f8fafc" }} />
            <Bar
              dataKey="inflow"
              fill={CHART_COLORS.inflow}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="outflow"
              fill={CHART_COLORS.outflow}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function ChartContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-base font-semibold text-slate-800">{title}</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  );
}
