import { FiSearch } from "react-icons/fi";
import type { ChangeEvent } from "react";

interface SearchItemProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchItem = ({
  value,
  onChange,
  placeholder = "Search by title, date, category or amount",
  className = "",
}: SearchItemProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`relative w-full max-w-xs ${className}`}>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
        <FiSearch className="h-4 w-4" />
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-9 pr-3 text-sm shadow-sm focus:border-gray-600 focus:outline-none  focus:ring-gray-300"
      />
    </div>
  );
};

export default SearchItem;

