
module.exports = (req, res, next) => {
  if (req.loggedUser.role === 'admin') {
    next()
  } else {
    next({ status: 403, message: "User not authorized to do this action" })
  }
}
