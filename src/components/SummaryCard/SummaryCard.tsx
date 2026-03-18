interface SummaryCardProps {
  title: string;
  value: number;
  currency?: boolean;
  suffix?: string;
  indicatorColor: string;
}

export default function SummaryCard({
  title,
  value,
  currency,
  suffix,
  indicatorColor,
}: SummaryCardProps) {
  const formattedValue = currency
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    : `${value.toFixed(1)}${suffix ?? ""}`;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-slate-200 ${indicatorColor} p-5 transition-all`}
    >
      <div>
        <p className="mb-1 text-xs font-bold tracking-wider text-slate-500 uppercase">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-900">{formattedValue}</p>
      </div>
    </div>
  );
}
