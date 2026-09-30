export type TApiListResponse<T> = {
  rows: T[];
  totalRows: number;
};

export type TApiErrorResponse = {
  errorMessage: string;
  errorCode?: string;
  errorFields?: string[];
};

export type TApiSelectOptionResponse = {
  id: number
  v: string
}
