const MainError = require('./main');

class DuplicateUser extends MainError.ExtendableError {
  constructor(info = 'User already Registered') {
    super({ code: MainError.USER_CONFLICT, info });
  }
}

module.exports = DuplicateUser;