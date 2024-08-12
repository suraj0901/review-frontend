import { PaginationState, Updater } from "@tanstack/react-table";

interface Pagination {
  page: string;
  limit: string;
}
export default function usePagination(
  previousPagination: Pagination,
  updateFilter: (pagination: Pagination) => void
) {
  const pagination = {
    pageIndex: +previousPagination.page - 1,
    pageSize: +previousPagination.limit,
  };
  function updatePagination(value: Updater<PaginationState>) {
    if (typeof value !== "function") return;
    const new_value = value(pagination);

    updateFilter({
      page: (new_value.pageIndex + 1).toString(),
      limit: new_value.pageSize.toString(),
    });
  }
  return {
    pagination,
    updatePagination,
  };
}
