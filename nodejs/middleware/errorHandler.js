const InternalServerError = require("../errors/internalServerError");
const ErrorIndex = require("../errors/main");

const errorHandler = (error, req, res, next) => {
  if(error instanceof ErrorIndex.ExtendableError) {
    res.status(error.HttpError).json({ error });
    return;
  }
  const InternalError = new InternalServerError();
  res.status(InternalError.HttpError).json({ error: InternalError });
  return;
};

module.exports = errorHandler;