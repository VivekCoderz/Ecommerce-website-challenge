const Errorhandler = function (cb) {
  return async function (req, res) {
    try {
      await cb(req, res);
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
