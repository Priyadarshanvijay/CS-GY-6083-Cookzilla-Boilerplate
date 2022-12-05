from errors.main import ExtendableError, USER_NOT_FOUND

class UserNotFound(ExtendableError):
  def __init__(self, code=..., info="User not found"):
    super().__init__(USER_NOT_FOUND, info)