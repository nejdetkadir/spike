exports.ensureLogin = (req, res, next) => {
  if (req.user) return next()

  next(new Error('Unauthorized'))
}