import { useCallback, useEffect, useState } from "react";
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const nextValue = value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(nextValue));
          return nextValue;
        });
      } catch (error) {
        console.error("Error setting localStorage key “" + key + "”:", error);
      }
    },
    [key],
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);
  return [storedValue, setValue] as const;
}
