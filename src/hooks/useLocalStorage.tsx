import { useState, useCallback } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];

function useLocalStorage(key: LocalStorageSetValue): [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
] {
  const [value, setValue] = useState<LocalStorageReturnValue>(
    localStorage.getItem(key),
  );
  const setItem = useCallback(
    (value: LocalStorageSetValue) => {
      localStorage.setItem(key, value);
      setValue(value);
    },
    [key, setValue],
  );
  const removeItem = useCallback(() => localStorage.removeItem(key), [key]);

  return [value, { setItem, removeItem }];
}

export default useLocalStorage as UseLocalStorage;
