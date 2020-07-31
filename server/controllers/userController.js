const jimp = require('jimp')
const multer = require('multer')
const fs = require('fs')

const asyncHandler = require('../middlewares/AsyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const { send, avatarUploadOptions } = require('../utils/utils')
const User = require('../database/models/User')
const uploads = require('../utils/cloudinaryConfig')

const getUserDetails = asyncHandler(async (req, res, next) => {
  await User.findById(req.user.id)
    .select('-password')
    .exec((err, user) => {
      if (err) return next(new ErrorResponse('Server error', 500))
      if (!user) return next(new ErrorResponse('No user fond', 400))

      req.profile = user
      next()
    })
})

const getUser = asyncHandler(async (req, res, next) => {
  await User.findById(req.user.id)
    .select('-password')
    .exec((err, user) => {
      if (err) return next(new ErrorResponse('Server error', 500))
      if (!user) return next(new ErrorResponse('No user fond', 400))

      req.profile = user
      send(res, 200, req.profile)
    })
})

const getUserById = asyncHandler(async (req, res, next) => {
  await User.findById(req.params.id)
    .select('-password')
    .exec((err, user) => {
      if (err) return next(new ErrorResponse('No  user found', 500))
      if (!user) return next(new ErrorResponse('No user found', 400))

      send(res, 200, user)
    })
})

const getAllUsers = asyncHandler(async (req, res, next) => {
  await User.find()
    .select('-password')
    .exec((err, user) => {
      if (err) return next(new ErrorResponse('No  user found', 500))
      if (!user) return next(new ErrorResponse('No user found', 400))

      send(res, 200, user)
    })
})

const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id).exec((err, user) => {
    if (err) return next(new ErrorResponse('Unable to delete', 500))
    if (!user) return next(new ErrorResponse('No user found', 400))

    send(res, 200, user)
  })
})

const uploadAvatar = multer(avatarUploadOptions).single('avatar')

const resizeAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const extension = req.file.mimetype.split('/')[1]
  req.body.avatar = `/uploads/avatars/${req.profile.username}.${extension}`

  const image = await jimp.read(req.file.buffer)
  await image.resize(250, jimp.AUTO)
  await image.write(`./public/${req.body.avatar}`)
  next()
})

const updateUser = asyncHandler(async (req, res, next) => {
  const response = await uploads(`./public/${req.body.avatar}`)
  req.body.avatar = response.url
  fs.rmdirSync('./public/uploads', { recursive: true })

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  send(res, 201, updatedUser)
})

const addRequested = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  await User.findByIdAndUpdate(
    otherId,
    {
      $push: {
        requested: ownId,
      },
    },
    {
      new: true,
    }
  )
  next()
})

const addRequesting = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  const updatedUser = await User.findByIdAndUpdate(
    ownId,
    {
      $push: {
        requesting: otherId,
      },
    },
    {
      new: true,
    }
  )
  send(res, 201, updatedUser)
})

const removeRequested = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  await User.findByIdAndUpdate(
    otherId,
    {
      $pull: {
        requested: ownId,
      },
    },
    {
      new: true,
    }
  )
  next()
})

const removeRequesting = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  const updatedUser = await User.findByIdAndUpdate(
    ownId,
    {
      $pull: {
        requesting: otherId,
      },
    },
    {
      new: true,
    }
  )
  send(res, 201, updatedUser)
})

const addFollowing = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  await User.findByIdAndUpdate(
    otherId,
    {
      $push: {
        following: ownId,
      },
      $pull: {
        requesting: ownId,
      },
    },
    {
      new: true,
    }
  )
  next()
})

const addFollower = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  const updatedUser = await User.findByIdAndUpdate(
    ownId,
    {
      $push: {
        followers: otherId,
      },
      $pull: {
        requested: otherId,
      },
    },
    {
      new: true,
    }
  )
  send(res, 201, updatedUser)
})

const removeFollower = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  await User.findByIdAndUpdate(
    otherId,
    {
      $pull: {
        followers: ownId,
      },
    },
    {
      new: true,
    }
  )
  next()
})

const removeFollowing = asyncHandler(async (req, res, next) => {
  const otherId = req.params.id
  const ownId = req.user.id
  const updatedUser = await User.findByIdAndUpdate(
    ownId,
    {
      $pull: {
        following: otherId,
      },
    },
    {
      new: true,
    }
  )
  send(res, 201, updatedUser)
})

const getUserFeed = asyncHandler(async (req, res, next) => {
  const { following } = req.profile
  following.push(req.user.id)
  const users = await User.find({ _id: { $nin: following } }).select(
    '_id username avatar'
  )
  send(res, 200, users)
})

module.exports = {
  getUser,
  getUserById,
  getAllUsers,
  deleteUser,
  uploadAvatar,
  resizeAvatar,
  updateUser,
  getUserDetails,
  addRequested,
  addRequesting,
  addFollower,
  addFollowing,
  removeRequested,
  removeRequesting,
  removeFollower,
  removeFollowing,
  getUserFeed,
}
