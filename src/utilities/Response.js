const { StatusCodes } = require('http-status-codes');

class Response {
  // Method for sending successful responses
  static success(res, data = null, statusCode = StatusCodes.OK) {
    // Clone the data object to prevent modifying the original one
    const responseData = data ? { ...data } : {};
    // Remove the 'message' property from the cloned data object
    delete responseData.message;

    // Construct the response object
    const responseObj = {
      message: data ? data.message : null, // Set the message from data, if provided
      data: responseData, // Set the data object without the 'message' property
      statusCode,
      success: true,
    };

    return res.status(statusCode).json(responseObj);
  }

  // Method for sending failure/error responses
  static fail(res, message = 'Failed', statusCode = 400, error = null) {
    // Construct the error response object
    const responseObj = {
      success: false,
      // Set the message from the provided object or default to 'Failed'
      message,
      // Set the status code from the provided object or default to 400
      statusCode,
      // Set any additional data from the provided object or default to an empty object
      extra: message && message.extra ? message.extra : {},
    };

    // Log error for developers
    if (error) {
      // console.error(error.stack || error);
    }

    // Send the response with the specified status code
    return res.status(statusCode).json(responseObj);
  }

  // Method for creating custom error objects
  static createError(type) {
    // Create a new Error object with the specified message
    const error = new Error(type.message);

    error.message = type.message;
    // Set the error code from the provided type or default to 500
    error.code = type.code || StatusCodes.INTERNAL_SERVER_ERROR;
    // Set the error name from the provided type or default to 'Error'
    error.name = type.name || 'Error';
    return error;
  }
}

module.exports = Response;
