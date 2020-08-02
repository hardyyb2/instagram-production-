const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { validateEmail } = require('../../utils/utils')

const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email cannot be empty'],
      unique: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password cannot be empty'],
      minlength: [8, 'password min length should be 8'],
      maxlength: [40, 'password max length should be 40'],
    },
    username: {
      type: String,
      required: [true, 'Username cannot be empty'],
      unique: true,
      maxlength: [40, 'username max length should be 40'],
    },
    avatar: {
      url: {
        type: String,
        required: [true, 'Avatar image is required'],
        default: '/exo.jpg',
      },
      id: {
        type: String,
        default: '/exo.jpg',
      },
    },
    about: {
      type: String,
      trim: true,
    },
    account_created: {
      type: String,
      default: Date.now(),
    },
    following: [{ type: ObjectId, ref: 'User' }],
    followers: [{ type: ObjectId, ref: 'User' }],
    requesting: [{ type: ObjectId, ref: 'User' }],
    requested: [{ type: ObjectId, ref: 'User' }],
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

const autoPopulateFollowingAndFollowers = function (next) {
  this.populate('following', '_id username avatar')
  this.populate('followers', '_id username avatar')
  this.populate('requesting', '_id username avatar')
  this.populate('requested', '_id username avatar')
  next()
}

userSchema.pre('findOne', autoPopulateFollowingAndFollowers)

const user = new mongoose.model('User', userSchema)

module.exports = user
