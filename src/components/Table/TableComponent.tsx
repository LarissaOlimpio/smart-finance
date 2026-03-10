import {
  Table,
  IconButton,
  Flex,
  Text,
  Badge,
  type BadgeProps,
} from "@radix-ui/themes";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface TableItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: string;
}

interface TableComponentProps {
  badgeColor: BadgeProps["color"];
  data: TableItem[];
  onEdit: (item: TableItem) => void;
  onDelete: (id: string) => void;
}
export default function TableComponent({
  badgeColor,
  data,
  onEdit,
  onDelete,
}: TableComponentProps) {
  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
  const ActionButtons = ({ item }: { item: TableItem }) => (
    <Flex gap="3">
      <IconButton variant="ghost" color="gray" onClick={() => onEdit(item)}>
        <LuPencilLine size="18" />
      </IconButton>
      <IconButton variant="ghost" color="red" onClick={() => onDelete(item.id)}>
        <LuTrash2 size="18" />
      </IconButton>
    </Flex>
  );
  return (
    <>
      <div className="flex flex-col gap-3 p-3 md:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <Text as="p" size="4" weight="bold" className="text-gray-900 mb-1">
              {item.title}
            </Text>

            <Flex align="center" gap="2" mb="3">
              <Text size="2" color="gray">
                {item.date}
              </Text>
              <Text size="2" color="gray">
                |
              </Text>
              <Badge color={badgeColor} variant="soft" radius="full">
                {item.category}
              </Badge>
            </Flex>

            <Text as="p" size="4" weight="bold">
              $ {formatAmount(item.amount)}
            </Text>
            <Flex justify="end" mb="2" mt="3">
              <ActionButtons item={item} />
            </Flex>
          </div>
        ))}
      </div>
      <Table.Root className="hidden md:table w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Edit/Delete</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>$ {formatAmount(item.amount)}</Table.Cell>
              <Table.Cell>
                <ActionButtons item={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
