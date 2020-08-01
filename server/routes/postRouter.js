const router = require('express').Router()
const { getUserDetails } = require('../controllers/userController')
const {
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
} = require('../controllers/postController')

router.route('/feed').get(getUserDetails, getPostFeed)
router.route('/addLike/:postId').put(toggleLike)
router.route('/removeLike/:postId').put(toggleLike)
router.route('/comment/:postId').put(toggleComment)
router.route('/removeComment/:postId').put(toggleComment)
router.route('/delete/:postId').delete(deletePost)
router.route('/get/:postId').get(getPostById)
router.route('/deleteallposts').delete(getUserDetails, deleteAllPostsByUserId)
router.route('/:id').get(getUserDetails, getPostsByUserId)
router.route('/').post(getUserDetails, uploadPost, resizePost, addPost)

module.exports = router
