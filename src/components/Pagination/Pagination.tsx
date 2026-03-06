import { Flex, Button, Text, IconButton } from "@radix-ui/themes";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex align="center" justify="between" mt="4" className="w-full">
      <Text size="2" color="gray">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </Text>

      <Flex gap="2" align="center">
        <IconButton
          variant="ghost"
          color="gray"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FiChevronLeft size={18} />
        </IconButton>

        <Flex gap="1" className="hidden sm:flex">
          {pages.map((page) => (
            <Button
              key={page}
              radius="full"
              variant={currentPage === page ? "solid" : "outline"}
              color="gray"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </Flex>
        <IconButton
          variant="ghost"
          color="gray"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FiChevronRight size={18} />
        </IconButton>
      </Flex>
    </Flex>
  );
}
