const asyncHandler = (asyncFunction) => (req, res, next) => {
  Promise
  .resolve(asyncFunction(req, res, next))
  .catch((err) =>
    next(err),
  );
};

export default asyncHandler;
