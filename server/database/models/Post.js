const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Schema

const Post = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, 'Caption cannot be empty'],
    },
    image: { type: String },
    postedBy: { type: ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    first3Likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    autoIndex: false,
  }
)

const autoPopulatePostedBy = function (next) {
  this.populate('postedBy', '_id username avatar')
  this.populate('comments.postedBy', '_id username avatar')
  this.populate('first3Likes', '_id username avatar')
  next()
}

Post.pre('findOne', autoPopulatePostedBy).pre('find', autoPopulatePostedBy)

Post.index({ postedBy: 1, createdAt: 1 })

const user = mongoose.model('Post', Post)

module.exports = user
