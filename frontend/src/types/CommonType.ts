export interface PaginationResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export type QueryParams = {
  page: number;
  size: number;
  text: string;
};

export interface ListResponse<T> {
  content: T[];
  pageable: PaginationParams;
}
