export class CustomError extends Error {
  code: number;
  status: number;

  constructor(message: string, code: number, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export const createError = (message: string, code: number, status: number) => {
  const error = new CustomError(message, code, status);
  throw error;
};
