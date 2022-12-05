from errors.main import ExtendableError, INTERNAL_SERVER_ERROR

class InternalServerError(ExtendableError):
  def __init__(self, code=..., info="Internal Server Error"):
    super().__init__(INTERNAL_SERVER_ERROR, info)