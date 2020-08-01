const jimp = require('jimp')
const multer = require('multer')
const fs = require('fs')
const cloudinary = require('cloudinary')
const _ = require('lodash')

const asyncHandler = require('../middlewares/AsyncHandler')
const { send, avatarUploadOptions } = require('../utils/utils')
const Post = require('../database/models/Post')
const uploads = require('../utils/cloudinaryConfig')

const uploadPost = multer(avatarUploadOptions).single('image')

const resizePost = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const extension = req.file.mimetype.split('/')[1]
  req.body.image = `/uploads/posts/${
    req.profile.username
  }-${Date.now()}.${extension}`

  const image = await jimp.read(req.file.buffer)
  await image.resize(250, jimp.AUTO)
  await image.write(`./public/${req.body.image}`)

  next()
})

const addPost = asyncHandler(async (req, res, next) => {
  req.body.postedBy = req.user.id
  const response = await uploads(`./public/${req.body.image}`)
  req.body.image = {
    url: response.url,
    id: response.id,
  }

  fs.rmdirSync('./public/uploads', { recursive: true })

  const post = new Post(req.body)
  const postData = await post.save()

  send(res, 201, postData)
})

const getPostsByUserId = asyncHandler(async (req, res, next) => {
  const post = await Post.find({ postedBy: req.params.id }).sort({
    createdAt: 'desc',
  })

  send(res, 201, post)
})

const toggleLike = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId
  const post = await Post.findById(req.params.postId)
  let operator, data, obj

  if (req.url.toLowerCase().includes('removelike')) {
    operator = '$pull'
    data = req.user.id
  } else {
    operator = '$push'
    data = req.user.id
  }

  if (post.first3Likes.length < 3) {
    obj = { [operator]: { likes: data, first3Likes: data } }
  } else {
    obj = { [operator]: { likes: data } }
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, obj, {
    new: true,
  })
    .populate('first3Likes', '_id username avatar')
    .populate('postedBy', '_id username avatar')
    .populate('comments.postedBy', '_id username avatar')

  send(res, 201, updatedPost)
})

const toggleComment = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId
  const { comment } = req.body
  let operator, data

  if (req.url.toLowerCase().includes('removecomment')) {
    operator = '$pull'
    data = { _id: comment.id }
  } else {
    operator = '$push'
    data = { text: comment.text, postedBy: req.user.id }
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      [operator]: { comments: data },
    },
    {
      new: true,
    }
  )
    .populate('postedBy', '_id username avatar')
    .populate('comments.postedBy', '_id username avatar')

  send(res, 201, updatedPost)
})

const getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
  send(res, 200, post)
})

const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.postId)
  send(res, 201, post)
})

const deleteAllPostsByUserId = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ postedBy: req.user.id })
  const cloudinaryIds = _.map(posts, 'image.id')
  let deletedPosts
  cloudinary.v2.api.delete_resources(cloudinaryIds, async (error, result) => {
    if (error) {
      return send(res, 400, error)
    } else {
      deletedPosts = await Post.deleteMany({ postedBy: req.user.id })
    }
  })

  send(res, 201, deletedPosts)
})

const getPostFeed = asyncHandler(async (req, res, next) => {
  const { following } = req.profile
  following.push(req.user.id)
  const users = await Post.find({ postedBy: { $in: following } }).sort({
    createdAt: 'desc',
  })
  send(res, 200, users)
})

module.exports = {
  uploadPost,
  resizePost,
  addPost,
  getPostsByUserId,
  getPostById,
  toggleLike,
  toggleComment,
  deletePost,
  getPostFeed,
  deleteAllPostsByUserId,
}
