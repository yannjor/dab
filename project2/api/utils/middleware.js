const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization;
  if (authorization) {
    request.token = authorization;
    next();
  } else {
    request.token = "";
    next();
  }
};

module.exports = {
  tokenExtractor,
};
