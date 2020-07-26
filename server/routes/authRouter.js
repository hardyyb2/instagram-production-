const router = require('express').Router()
const { signUp, login } = require('../controllers/authController')

router.route(`/signup`).post(signUp)
router.route(`/login`).post(login)

module.exports = router
