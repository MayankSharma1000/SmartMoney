const isAdmin = (req, res, next) => {

  if (!req.user) {

      const error = new Error("Unauthorized");
      error.statusCode = 401;

      return next(error);

  }

  if (req.user.role !== "admin") {

      const error = new Error("Access denied");
      error.statusCode = 403;

      return next(error);

  }

  next();

};

module.exports = {
  isAdmin
};
