def getHttpError(code = 500, name = 'INTERNAL_SERVER_ERROR'):
  class Temp(int):
    def __str__(self) -> str:
      return self.name
    
    def __init__(self, code):
      super(int, code).__init__()
      self.name = name
    
  return Temp(code)


class ExtendableError(Exception):
  def HttpError(self):
    return self.code
  
  def __init__(self, code = getHttpError(), info = ""):
    super().__init__(info)
    self.info = info
    self.code = code
    self.name = code.name



INTERNAL_SERVER_ERROR = getHttpError()
UNAUTHORIZED = getHttpError(401, 'UNAUTHORIZED')
WRONG_CREDENTIALS = getHttpError(401, 'WRONG_CREDENTIALS')
INPUT_PARAM_ERROR = getHttpError(400, 'INPUT_PARAM_ERROR')
NOT_FOUND = getHttpError(404, 'NOT_FOUND')
USER_NOT_FOUND = getHttpError(404, 'USER_NOT_FOUND')
USER_CONFLICT = getHttpError(400, 'USER_CONFLICT')
INVALID_JWT_TOKEN = getHttpError(401, 'INVALID_JWT_TOKEN')