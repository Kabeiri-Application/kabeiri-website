import { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
} from '@tanstack/react-table';

interface TableState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pagination: PaginationState;
  rowSelection: Record<string, boolean>;
}

interface UsePersistedTableStateOptions {
  storageKey?: string;
  defaultPageSize?: number;
}

export function usePersistedTableState(options: UsePersistedTableStateOptions = {}) {
  const { storageKey = 'table-state', defaultPageSize = 10 } = options;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL params or localStorage
  const getInitialState = useCallback((): TableState => {
    // Try URL params first
    const urlState = getStateFromUrl(searchParams);
    if (urlState) {
      return urlState;
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            sorting: parsed.sorting || [],
            columnFilters: parsed.columnFilters || [],
            columnVisibility: parsed.columnVisibility || {},
            pagination: {
              pageIndex: parsed.pagination?.pageIndex || 0,
              pageSize: parsed.pagination?.pageSize || defaultPageSize,
            },
            rowSelection: parsed.rowSelection || {},
          };
        }
      } catch (error) {
        console.warn('Failed to parse stored table state:', error);
      }
    }

    // Default state
    return {
      sorting: [],
      columnFilters: [],
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
      rowSelection: {},
    };
  }, [searchParams, storageKey, defaultPageSize]);

  const [tableState, setTableState] = useState<TableState>(getInitialState);

  // Update URL and localStorage when state changes
  const updateState = useCallback(
    (updates: Partial<TableState>) => {
      const newState = { ...tableState, ...updates };
      setTableState(newState);

      // Update URL with shallow routing
      const params = new URLSearchParams(searchParams.toString());
      updateUrlParams(params, newState);
      
      const url = params.toString();
      router.replace(`${pathname}${url ? `?${url}` : ''}`, { scroll: false });

      // Update localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(newState));
        } catch (error) {
          console.warn('Failed to save table state to localStorage:', error);
        }
      }
    },
    [tableState, searchParams, router, pathname, storageKey]
  );

  // Individual state setters
  const setSorting = useCallback(
    (sorting: SortingState | ((prev: SortingState) => SortingState)) => {
      const newSorting = typeof sorting === 'function' ? sorting(tableState.sorting) : sorting;
      updateState({ sorting: newSorting });
    },
    [tableState.sorting, updateState]
  );

  const setColumnFilters = useCallback(
    (filters: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => {
      const newFilters = typeof filters === 'function' ? filters(tableState.columnFilters) : filters;
      updateState({ columnFilters: newFilters });
    },
    [tableState.columnFilters, updateState]
  );

  const setColumnVisibility = useCallback(
    (visibility: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => {
      const newVisibility = typeof visibility === 'function' ? visibility(tableState.columnVisibility) : visibility;
      updateState({ columnVisibility: newVisibility });
    },
    [tableState.columnVisibility, updateState]
  );

  const setPagination = useCallback(
    (pagination: PaginationState | ((prev: PaginationState) => PaginationState)) => {
      const newPagination = typeof pagination === 'function' ? pagination(tableState.pagination) : pagination;
      updateState({ pagination: newPagination });
    },
    [tableState.pagination, updateState]
  );

  const setRowSelection = useCallback(
    (selection: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
      const newSelection = typeof selection === 'function' ? selection(tableState.rowSelection) : selection;
      updateState({ rowSelection: newSelection });
    },
    [tableState.rowSelection, updateState]
  );

  // Reset all filters to default state
  const resetState = useCallback(() => {
    const defaultState = {
      sorting: [],
      columnFilters: [],
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
      rowSelection: {},
    };
    
    setTableState(defaultState);

    router.replace(pathname, { scroll: false });

    // Clear localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn('Failed to clear table state from localStorage:', error);
      }
    }
  }, [defaultPageSize, router, pathname, storageKey]);

  return {
    ...tableState,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setPagination,
    setRowSelection,
    resetState,
  };
}

// Helper functions for URL parameter handling
function getStateFromUrl(searchParams: URLSearchParams): TableState | null {
  try {
    const sorting = searchParams.get('sort');
    const filters = searchParams.get('filters');
    const visibility = searchParams.get('visibility');
    const page = searchParams.get('page');
    const pageSize = searchParams.get('pageSize');

    if (!sorting && !filters && !visibility && !page && !pageSize) {
      return null;
    }

    return {
      sorting: sorting ? JSON.parse(decodeURIComponent(sorting)) : [],
      columnFilters: filters ? JSON.parse(decodeURIComponent(filters)) : [],
      columnVisibility: visibility ? JSON.parse(decodeURIComponent(visibility)) : {},
      pagination: {
        pageIndex: page ? parseInt(page, 10) : 0,
        pageSize: pageSize ? parseInt(pageSize, 10) : 10,
      },
      rowSelection: {},
    };
  } catch (error) {
    console.warn('Failed to parse table state from URL:', error);
    return null;
  }
}

function updateUrlParams(params: URLSearchParams, state: TableState) {
  // Remove existing table params
  params.delete('sort');
  params.delete('filters');
  params.delete('visibility');
  params.delete('page');
  params.delete('pageSize');

  // Add new params only if they have meaningful values
  if (state.sorting.length > 0) {
    params.set('sort', encodeURIComponent(JSON.stringify(state.sorting)));
  }

  if (state.columnFilters.length > 0) {
    params.set('filters', encodeURIComponent(JSON.stringify(state.columnFilters)));
  }

  if (Object.keys(state.columnVisibility).length > 0) {
    params.set('visibility', encodeURIComponent(JSON.stringify(state.columnVisibility)));
  }

  if (state.pagination.pageIndex > 0) {
    params.set('page', state.pagination.pageIndex.toString());
  }

  if (state.pagination.pageSize !== 10) {
    params.set('pageSize', state.pagination.pageSize.toString());
  }
}
