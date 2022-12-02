const MainError = require('./main');

class IncorrectPassword extends MainError.ExtendableError {
  constructor(info = 'Incorrect credentials') {
    super({ code: MainError.WRONG_CREDENTIALS, info });
  }
}

module.exports = IncorrectPassword;