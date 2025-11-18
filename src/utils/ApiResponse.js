class ApiResponse {
  static success({ status = 0, message = 'Success', data = null }) {
    return {
      status,
      message,
      data,
    };
  }

  static error({ status = 100, message = 'Error', data = null }) {
    return {
      status,
      message,
      data,
    };
  }
}

module.exports = ApiResponse;
