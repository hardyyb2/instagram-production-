const ErrorResponse = require('../utils/errorResponse')

const asyncHandler = require('../middlewares/AsyncHandler')
const User = require('../database/models/User')
const { send, generateToken } = require('../utils/utils')

const login = asyncHandler(async (req, res, next) => {
  await User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return next(new ErrorResponse('No user found', 500))
    if (!user) return next(new ErrorResponse('No user fond', 400))

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err)
        return next(new ErrorResponse('user name or password incorrect', 401))

      if (isMatch) {
        let token = req.body.rememberMe
          ? generateToken(user.id, '15d')
          : generateToken(user.id, '24h')
        return send(res, 200, token)
      } else {
        return next(new ErrorResponse('user name or password incorrect', 401))
      }
    })
  })
})

const signUp = asyncHandler(async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  const userData = await user.save()
  send(res, 201, userData)
})

module.exports = { signUp, login }
