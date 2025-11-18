const ApiResponse = require('../utils/ApiResponse');

function ErrorHandler(err, req, res, next) {
  if (err.statusCode && err.statusMessage) {
    const errorResponse = {
      status: err.statusCode,
      message: err.message,
      data: null,
    };
    return res.status(err.code).json(ApiResponse.error({ ...errorResponse }));
  }

  return res.status(500).json(ApiResponse.error(500, 'Internal server error'));
}

module.exports = ErrorHandler;
