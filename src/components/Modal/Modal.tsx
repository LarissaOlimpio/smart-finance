import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  type ButtonProps,
} from "@radix-ui/themes";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

interface ModalProps {
  triggerText: string;
  title: string;
  description: string;
  colorButton: ButtonProps["color"];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (data: { title: string; amount: number; date: string }) => void;
}
export default function Modal({
  triggerText,
  title,
  description,
  colorButton,
  isOpen,
  setIsOpen,
  onSave,
}: ModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    date: "",
  });
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: "", amount: 0, date: "" });
    setIsOpen(false);
  };
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
                defaultValue="title"
                placeholder="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Root
                type="number"
                defaultValue="$0.00"
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    amount: parseFloat(e.target.value),
                  }))
                }
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Date
              </Text>
              <TextField.Root
                type="date"
                defaultValue=""
                placeholder="Select a date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="green" type="submit">
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
