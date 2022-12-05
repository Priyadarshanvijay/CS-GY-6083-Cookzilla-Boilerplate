from errors.main import ExtendableError, USER_CONFLICT

class DuplicateUser(ExtendableError):
  def __init__(self, code=..., info="User already Registered"):
    super().__init__(USER_CONFLICT, info)