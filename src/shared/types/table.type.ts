import type { ReactNode } from "react";
import type { NavIcon } from "@/shared/icons";

export type TTableColumn<T> = {
  id: keyof T | string;
  label: string;
  align?: "left" | "center" | "right";
  minWidth?: number;
  width?: number | string;
  render?: (row: T) => ReactNode;
  /** Include this column in client-side table search. Defaults to true. */
  searchable?: boolean;
  /** Custom text for search when `render` is used or the raw field value is not enough. */
  getSearchValue?: (row: T) => string;
};

export type TTableSort = {
  field: string;
  direction: "asc" | "desc";
};

export type TTablePagination = {
  page: number;
  pageSize: number;
  total?: number;
};

export type TTableRowAction<T> = {
  edit?: {
    label?: string;
    icon?: NavIcon;
    getPath?: (row: T) => string;
    onClick?: (row: T) => void;
    hidden?: (row: T) => boolean;
  };
  view?: {
    label?: string;
    icon?: NavIcon;
    getPath?: (row: T) => string;
    onClick?: (row: T) => void;
    hidden?: (row: T) => boolean;
  };
  delete?: {
    label?: string;
    onConfirm: (row: T) => void | Promise<void>;
    confirmTitle?: string;
    confirmMessage?: (row: T) => string;
    hidden?: (row: T) => boolean;
  };
};
