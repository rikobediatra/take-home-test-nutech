class AppError extends Error {
  constructor(code, statusCode, message) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.statusMessage = message;
  }
}

module.exports = AppError;
