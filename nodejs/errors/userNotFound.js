const MainError = require('./main');

class UserNotFound extends MainError.ExtendableError {
  constructor(info = 'User not found') {
    super({ code: MainError.USER_NOT_FOUND, info });
  }
}

module.exports = UserNotFound;