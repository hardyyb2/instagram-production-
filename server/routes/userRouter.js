const router = require('express').Router()
const {
  getUser,
  getUserDetails,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
  uploadAvatar,
  resizeAvatar,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  getUserFeed,
} = require('../controllers/userController')

router
  .route('/')
  .get(getUser)
  .delete(deleteUser)
  .put(getUserDetails, uploadAvatar, resizeAvatar, updateUser)

router.route('/feed').get(getUserDetails, getUserFeed)

router.route('/follow/:id').put(addFollower, addFollowing)
router.route('/unfollow/:id').put(removeFollower, removeFollowing)

router.route('/all').get(getAllUsers)

router.route('/:id').get(getUserById)

module.exports = router
