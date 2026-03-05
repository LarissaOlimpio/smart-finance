import { Table } from "@radix-ui/themes";

interface TableItem {
  id: string;
  title: string;
  date: string;
  amount: number;
}

interface TableComponentProps {
  data: TableItem[];
}
export default function TableComponent({ data }: TableComponentProps) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
