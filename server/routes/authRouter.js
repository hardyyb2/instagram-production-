const router = require('express').Router()
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController')

router.route(`/signup`).post(signUp)
router.route(`/login`).post(login)
router.route(`/forgotpassword`).post(forgotPassword)
router.route(`/resetpassword`).get(resetPassword)
router.route(`/updatepassword`).put(updatePassword)

module.exports = router
