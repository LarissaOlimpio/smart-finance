import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  Select,
  type ButtonProps,
} from "@radix-ui/themes";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

interface FormData {
  title: string;
  amount: number;
  date: string;
  category: string;
}
interface EditModalProps extends FormData {
  id: string;
}
interface ModalProps {
  triggerText: string;
  title: string;
  description: string;
  colorButton: ButtonProps["color"];
  isOpen: boolean;
  categoryOptions: { name: string; value: string }[];
  setIsOpen: (isOpen: boolean) => void;
  onSave: (data: FormData) => void;
  itensToEdit: EditModalProps | null;
}
export default function Modal({
  triggerText,
  title,
  description,
  colorButton,
  isOpen,
  itensToEdit,
  categoryOptions,
  setIsOpen,
  onSave,
}: ModalProps) {
  const [formData, setFormData] = useState({
    title: itensToEdit?.title ?? "",
    amount: itensToEdit?.amount ?? 0,
    date: itensToEdit?.date ?? "",
    category: itensToEdit?.category ?? "",
  });
  const handleChange = (
    name: keyof typeof formData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const cleanFormData = () => {
    setFormData({ title: "", amount: 0, date: "", category: "" });
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    cleanFormData();
    setIsOpen(false);
  };
  console.log(formData.amount);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button color={colorButton}>
          {" "}
          <FiPlus />
          {triggerText}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="650px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                required
                type="text"
                placeholder="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Root
                required
                type="number"
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) =>
                  handleChange("amount", parseFloat(e.target.value))
                }
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Date
              </Text>
              <TextField.Root
                required
                type="date"
                placeholder="Select a date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Category
              </Text>
              <Select.Root
                defaultValue="other"
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {categoryOptions.map((option) => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => cleanFormData()}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button color="green" type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
