const validator = require('validator')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const validateEmail = (email) => validator.isEmail(email)

const send = (res, status, data) => {
  let success = status.toString().charAt(0) === '2' ? true : false
  res.status(status).send({ success, data })
}

const getDuplicate = (err) => {
  let str = ''
  for (let [key, value] of Object.entries(err.keyValue)) {
    str += `${key} ${value} already exists.`
  }
  return str
}

const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '24h',
  })

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith(`image/`)) {
      cb(null, './public/images/')
    } else {
      cb({ message: 'this file is neither a video or image file' }, false)
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const avatarUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith(`image/`)) {
      next(null, true)
    } else {
      next(null, false)
    }
  },
}

module.exports = {
  validateEmail,
  send,
  getDuplicate,
  generateToken,
  avatarUploadOptions,
}
