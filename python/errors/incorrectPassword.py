from errors.main import ExtendableError, WRONG_CREDENTIALS

class IncorrectPassword(ExtendableError):
  def __init__(self, code=..., info="Incorrect credentials"):
    super().__init__(WRONG_CREDENTIALS, info)