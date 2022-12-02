// map the specific app errors to their respective http error codes.
const getHttpError = (code = 500, name = 'INTERNAL_SERVER_ERROR') => new class extends Number {
  get String() { return this.name; }

  constructor() {
    super(code);
    this.name = name;
  }
}();

class ExtendableError extends Error {
  get HttpError() {
    return this.code;
  }

  /**
   * Creates a custom error class that can be extendable
   * @param {{code: string, info: string}} status - HTTP status message and code
   */
  constructor({ code = getHttpError(), info } = {}) {
    super(info);
    if (info) this.info = info;
    this.code = code;
    this.name = code.name;
    Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = {
  INTERNAL_SERVER_ERROR: getHttpError(),
  UNAUTHORIZED: getHttpError(401, 'UNAUTHORIZED'),
  WRONG_CREDENTIALS: getHttpError(401, 'WRONG_CREDENTIALS'),
  INPUT_PARAM_ERROR: getHttpError(400, 'INPUT_PARAM_ERROR'),
  NOT_FOUND: getHttpError(404, 'NOT_FOUND'),
  USER_NOT_FOUND: getHttpError(404, 'USER_NOT_FOUND'),
  USER_CONFLICT: getHttpError(400, 'USER_CONFLICT'),
  INVALID_JWT_TOKEN: getHttpError(401, 'INVALID_JWT_TOKEN'),
  ExtendableError
};
