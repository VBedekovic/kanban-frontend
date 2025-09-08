export type TasksQueryParams = {
  page: number;
  size: number;
  status?: string;
  sort?: string | string[];
};