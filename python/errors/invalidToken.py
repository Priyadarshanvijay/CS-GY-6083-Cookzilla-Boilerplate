from errors.main import ExtendableError, INVALID_JWT_TOKEN

class InvalidJwtError(ExtendableError):
  def __init__(self, code=..., info="Insufficient credentials"):
    super().__init__(INVALID_JWT_TOKEN, info)