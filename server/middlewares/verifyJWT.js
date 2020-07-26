const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next(new ErrorResponse('Invalid user', 401))

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return next(new ErrorResponse('Unauthorized user', 403))
    req.user = user
    next()
  })
}

module.exports = { authenticateToken }
