class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
export class BadRequestError extends CustomError {
  constructor(message, code = 400) {
    super(message, code);
  }
}
export class AuthenticationError extends CustomError {
  constructor(message, code = 401) {
    super(message, code);
  }
}
