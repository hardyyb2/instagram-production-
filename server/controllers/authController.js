const nodemailer = require('nodemailer')
const crypto = require('crypto')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/AsyncHandler')
const User = require('../database/models/User')
const { send, generateToken } = require('../utils/utils')

dotenv.config()

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

const forgotPassword = asyncHandler(async (req, res, next) => {
  if (req.body.email === '') {
    send(res, 400, 'Email Required')
  }

  const user = await User.findOne({
    email: req.body.email,
  })

  if (user === null) {
    console.log('here')
    send(res, 400, 'Email not registered on Exogram.')
  } else {
    const token = crypto.randomBytes(20).toString('hex')
    await user.updateOne({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    })

    console.log(`${process.env.EMAIL_ADDRESS}`, `${process.env.EMAIL_PASSWORD}`)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    })

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${user.email}`,
      subject: 'Exogram (Link To Reset Password)',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        //   process.env.NODE_ENV ===
        // 'development'
        `http://localhost:3000/reset/${token}\n\n` +
        // : `http://exogram.herokuapp.com/reset/${token}\n\n`
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        send(res, 500, { error: 'Something went Wrong' + err })
      } else {
        send(res, 200, 'Email sent')
      }
    })
  }
})

const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    },
  })
  if (user == null) {
    send(res, 403, 'Password reset link is invalid or has expired')
  } else {
    send(res, 300, {
      username: user.username,
      message: 'password reset link ok',
    })
  }
})

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = User.findOne({
    where: {
      username: req.body.username,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
  })
  if (user === null) {
    send(res, 403, 'password reset link is invalid or has expired')
  } else if (user != null) {
    console.log('user exists in db')
    bcrypt
      .hash(req.body.password, process.env.SALT_ROUNDS)
      .then((hashedPassword) => {
        user.update({
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        })
      })
      .then(() => {
        send(res, 200, 'Password updated')
      })
  } else {
    send(res, 401, `No user found`)
  }
})

module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
}
