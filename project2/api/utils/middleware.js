const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization;
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
    next();
  } else {
    request.token = "";
    next();
  }
};

module.exports = {
  tokenExtractor,
};
