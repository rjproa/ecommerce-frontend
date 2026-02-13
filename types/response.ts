export type ResponseType<T = unknown> = {
  result: T | null;
  loading: boolean;
  error: string;
}