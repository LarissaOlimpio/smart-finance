import { Table } from "@radix-ui/themes";

interface TableItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: string;
}

interface TableComponentProps {
  data: TableItem[];
}
export default function TableComponent({ data }: TableComponentProps) {
  return (
    <Table.Root>
      <Table.Header className="hidden md:table-header-group">
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="block md:table-row-group">
        {data.map((item) => (
          <Table.Row
            key={item.id}
            className="flex flex-col md:table-row mb-4 md:mb-0 p-4 md:p-0 bg-white md:bg-transparent rounded-lg border border-gray-200 md:border-none shadow-sm md:shadow-none"
          >
            <Table.RowHeaderCell className="block md:table-cell md:align-middle">
              {item.title}
            </Table.RowHeaderCell>
            <Table.Cell className="block md:table-cell md:align-middle">
              {item.date}
            </Table.Cell>
            <Table.Cell className="block md:table-cell md:align-middle">
              {item.category}
            </Table.Cell>
            <Table.Cell className="block md:table-cell md:align-middle">
              ${" "}
              {item.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
