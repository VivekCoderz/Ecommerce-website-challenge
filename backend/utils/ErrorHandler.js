const Errorhandler = function (cb) {
  return async function (req, res,next) {
    try {
      await cb(req, res,next);
    } catch (err) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        success: err.success,
      });
    }
  };
};

module.exports = Errorhandler;
