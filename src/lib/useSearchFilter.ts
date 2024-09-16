import { useMemo } from "react";
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

interface Config<T, S> {
  serialize?: (value: T) => S;
  deserialize?: (value: S) => T;
}

export function useQueryFilter<
  T extends URLSearchParamsInit,
  S extends URLSearchParamsInit
>(initialValues: T, config: Config<T, S> = {}) {
  const [searchParams, setSearchParams] = useSearchParams(
    config.serialize ? config.serialize?.(initialValues) : initialValues
  );

  const { filters, serializedFilters } = useMemo(() => {
    const filters = config?.serialize
      ? config.serialize?.(initialValues)
      : initialValues;

    if (
      typeof filters !== "object" ||
      filters === null ||
      Array.isArray(filters) ||
      filters instanceof URLSearchParams
    )
      throw new Error("Invalid filters");

    for (const key in filters) {
      if (!searchParams.has(key)) continue;
      filters[key] = Array.isArray(filters[key])
        ? searchParams.getAll(key)
        : (searchParams.get(key) as string);
    }
    return {
      filters: config?.deserialize
        ? config.deserialize?.(filters as S)
        : filters,
      serializedFilters: filters,
    };
  }, [searchParams, initialValues, config]); //Object.fromEntries(searchParams.entries());

  function updateFilters(value: Partial<T>) {
    let serializedFilters;
    if (config?.serialize)
      serializedFilters = config.serialize?.(
        Object.assign({}, initialValues, filters, value)
      );
    else serializedFilters = Object.assign({}, filters, value);
    setSearchParams(serializedFilters);
  }
  function resetFilters(value = {}) {
    if (config?.serialize)
      value = config.serialize?.(Object.assign({}, initialValues, value));
    setSearchParams(value);
  }

  return { filters, serializedFilters, updateFilters, resetFilters };
}
