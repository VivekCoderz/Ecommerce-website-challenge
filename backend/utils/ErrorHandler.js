const Errorhandler = function (cb) {
  return async function (req, res,next) {
    try {
      await cb(req, res,next);
    } catch (err) {
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
        success: err.success || false,
      });
    }
  };
};

module.exports = Errorhandler;
