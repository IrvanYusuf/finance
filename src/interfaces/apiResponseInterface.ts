export interface ApiResponse<T> {
  message: string;
  data: T;
  errors: any;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
  links: Links;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
