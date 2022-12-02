const MainError = require('./main');

class InvalidJwtError extends MainError.ExtendableError {
  constructor(info = 'Insufficient credentials') {
    super({ code: MainError.INVALID_JWT_TOKEN, info });
  }
}

module.exports = InvalidJwtError;