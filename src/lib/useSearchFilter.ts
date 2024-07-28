import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export default function useSearchFilter<T extends URLSearchParamsInit>(
  intialValue: T
) {
  const [searchParams, setSearchParams] = useSearchParams(intialValue);
  const filter = Object.fromEntries(searchParams.entries());

  function updateFilter(values: Partial<T>) {
    setSearchParams({ ...filter, ...values });
  }

  return { filter: filter as T, updateFilter };
}
