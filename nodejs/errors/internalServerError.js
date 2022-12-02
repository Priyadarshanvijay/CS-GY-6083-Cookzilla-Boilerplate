const MainError = require('./main');

class InternalServerError extends MainError.ExtendableError {
  constructor(info = 'Internal Server Error') {
    super({ code: MainError.INTERNAL_SERVER_ERROR, info });
  }
}

module.exports = InternalServerError;