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
  addRequested,
  addRequesting,
  addFollower,
  addFollowing,
  removeRequested,
  removeRequesting,
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

router.route('/request/:id').put(addRequested, addRequesting)
router.route('/removerequest/:id').put(removeRequested, removeRequesting)

router.route('/follow/:id').put(addFollowing, addFollower)
router.route('/unfollow/:id').put(removeFollowing, removeFollower)

router.route('/all').get(getAllUsers)

router.route('/:id').get(getUserById)

module.exports = router
