import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export default function useSearchFilter<T extends URLSearchParamsInit>(
  intialValue: T
) {
  const [searchParams, setSearchParams] = useSearchParams(intialValue);
  const filter = Object.fromEntries(searchParams.entries()) as object;

  function updateFilter(values: T | ((prev: T) => T)) {
    if (typeof values === "function") {
      const newValues = values(filter as T);
      setSearchParams({ ...filter, ...(newValues as object) });
    } else {
      setSearchParams({ ...filter, ...(values as object) });
    }
  }

  return { filter: filter as T, updateFilter };
}
