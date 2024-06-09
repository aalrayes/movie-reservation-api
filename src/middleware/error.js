function errorMiddleware(err, req, res, next) {
  const status = err.status ? err.status : 500;
  const message = status === 500 ? "Internal Server Error" : err.message;
  const errors = err.error;
  res.status(status).send({ status, message, error: errors });
}

module.exports = errorMiddleware
