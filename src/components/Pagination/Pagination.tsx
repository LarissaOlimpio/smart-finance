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
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return range(1, totalPages);
    }

    const pages: (number | string)[] = [1];

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage > 3) {
      pages.push("...");
    }

    pages.push(...range(startPage, endPage));

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

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

        <Flex gap="1" display={{ initial: "none", sm: "flex" }}>
          {pages.map((page, index) =>
            page === "..." ? (
              <Text key={index} size="2" color="gray">
                ...
              </Text>
            ) : (
              <Button
                key={index}
                radius="large"
                variant={currentPage === page ? "solid" : "outline"}
                color="gray"
                onClick={() => onPageChange(Number(page))}
              >
                {page}
              </Button>
            ),
          )}
        </Flex>
        <IconButton
          variant="ghost"
          color="gray"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          <FiChevronRight size={18} />
        </IconButton>
      </Flex>
    </Flex>
  );
}
