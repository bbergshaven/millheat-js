/** Generic API Result */
export type Result<T> = {
  errorCode: number;
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
};
