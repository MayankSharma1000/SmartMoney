class ApiResponse {

  static success(
    res,
    data = {},
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null
    });
  }

  static error(
    res,
    message = "Something went wrong",
    statusCode = 500,
    error = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      error
    });
  }

}

module.exports = ApiResponse;
