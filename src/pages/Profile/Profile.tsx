import React, { useLayoutEffect } from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { find } from 'lodash'
import { Grid, IconButton, Typography, AppBar, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import TelegramIcon from '@material-ui/icons/Telegram'
import Skeleton from '@material-ui/lab/Skeleton'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import {
  getPostByUserId,
  postProps,
  PostActions,
  getUserById,
  UserProps,
  toggleSnackBar,
} from '../../store/actions'
import { IState } from '../../store/types'
import { SnackBar, FollowButton } from '../../components'
import useStyles from './Profile.styles'
import { Spinner } from '../../UX'

interface IProps {
  userId: string
  user: UserProps
  userloading: boolean
  postloading: boolean
  selectedUser: UserProps
  selectedUserPosts: postProps[] | null
  showSnackBar: boolean
  snackBarMessage: string
  getPostByUserIdConnect: (userId: string) => void
  getUserByIdConnect: (userId: string) => void
  toggleSnackBarConnect: (message: string) => void
}

const Profile: React.FC<IProps> = ({
  userId,
  user,
  userloading,
  postloading,
  selectedUser,
  selectedUserPosts,
  showSnackBar,
  snackBarMessage,
  getPostByUserIdConnect,
  getUserByIdConnect,
  toggleSnackBarConnect,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  useLayoutEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      const userid = params.get('userId')
      if (userid) {
        Promise.all([
          getPostByUserIdConnect(userid!),
          getUserByIdConnect(userid!),
        ])
      } else {
        // history.push('/home')
      }
    } else {
      // history.push('/home')
    }
    return () => {
      if (showSnackBar) {
        toggleSnackBarConnect('')
      }
    }
  }, [location.search])

  const handleBackClick = () => history.goBack()

  const handlePostCardClick = (post: postProps) =>
    history.push({
      pathname: `/post`,
      search: `postId=${post._id}`,
    })

  const handleEditProfile = () => history.push('/editprofile')

  const findExistence = (userId: string) => {
    let payload = {
      userId,
      follow: true,
    }
    if (
      find(user.following, ['_id', userId]) ||
      user.following.includes(userId)
    ) {
      payload.follow = false
    }
    return payload
  }

  if (!postloading)
    return (
      <Grid container item xs={12} sm={12} className={classes.root}>
        <AppBar position='sticky' className={classes.appBar}>
          <IconButton
            edge='start'
            className={classes.camera}
            color='inherit'
            aria-label='camera'
            onClick={handleBackClick}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            {selectedUser ? (
              selectedUser.username
            ) : (
              <Skeleton
                className={classes.skeleton}
                height='100%'
                classes={{
                  wave: classes.wave,
                }}
                animation='wave'
              />
            )}
          </Typography>
          <IconButton
            className={classes.message}
            color='inherit'
            aria-label='message'
          >
            <MoreHorizIcon fontSize='large' />
          </IconButton>
        </AppBar>
        <Grid container className={classes.body}>
          <Grid container item className={classes.details} direction='row'>
            <Grid item className={classes.imageContainer}>
              {selectedUser ? (
                <img
                  src={selectedUser.avatar}
                  alt='profile'
                  className={classes.image}
                />
              ) : (
                <Skeleton
                  className={classes.skeleton}
                  height='100%'
                  classes={{
                    wave: classes.wave,
                  }}
                  animation='wave'
                />
              )}
            </Grid>
            <Grid item className={classes.info}>
              <Grid item className={classes.userName}>
                {selectedUser ? (
                  selectedUser.username
                ) : (
                  <Skeleton
                    className={classes.skeleton}
                    classes={{
                      wave: classes.wave,
                    }}
                    animation='wave'
                  />
                )}
              </Grid>
              <Grid item className={classes.bio}>
                {selectedUser ? (
                  selectedUser.about || 'No Bio'
                ) : (
                  <Skeleton
                    className={classes.skeleton}
                    height='100%'
                    classes={{
                      wave: classes.wave,
                    }}
                    animation='wave'
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          {selectedUser && selectedUser._id === userId && (
            <Grid item xs={12} className={classes.editProfile}>
              <Button
                variant='outlined'
                startIcon={<EditOutlinedIcon />}
                className={classes.editProfileButton}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            </Grid>
          )}

          <Grid item className={classes.stats}>
            {selectedUser && selectedUserPosts ? (
              <>
                <Grid
                  container
                  item
                  direction='column'
                  justify='center'
                  xs={4}
                  className={classes.statsContainer}
                >
                  <Grid item className={classes.statsNumber}>
                    {selectedUserPosts.length}
                  </Grid>
                  <Grid item className={classes.statsText}>
                    Posts
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  direction='column'
                  justify='center'
                  xs={4}
                  className={classes.statsContainer}
                >
                  <Grid item className={classes.statsNumber}>
                    {selectedUser.followers.length}
                  </Grid>
                  <Grid item className={classes.statsText}>
                    Followers
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  direction='column'
                  justify='center'
                  xs={4}
                  className={classes.statsContainer}
                >
                  <Grid item className={classes.statsNumber}>
                    {selectedUser.following.length}
                  </Grid>
                  <Grid item className={classes.statsText}>
                    Following
                  </Grid>
                </Grid>
              </>
            ) : (
              <Skeleton
                className={classes.skeleton}
                classes={{
                  wave: classes.wave,
                }}
                animation='wave'
              />
            )}
          </Grid>
          {selectedUser && selectedUser._id !== userId && (
            <Grid
              container
              item
              xs={12}
              sm={12}
              className={classes.actionButtons}
            >
              <FollowButton
                design={classes.followButton}
                follows={
                  !!find(user.following, ['_id', selectedUser._id]) ||
                  user.following.includes(selectedUser._id)
                }
                payload={findExistence(selectedUser._id)}
              />
              <IconButton className={classes.messageButton}>
                <TelegramIcon fontSize='large' />
              </IconButton>
            </Grid>
          )}
          <Grid
            container
            item
            xs={12}
            sm={12}
            className={classes.postContainer}
          >
            {selectedUserPosts ? (
              selectedUserPosts.length !== 0 ? (
                selectedUserPosts.map((post, index) => (
                  <Grid
                    item
                    xs={4}
                    className={classes.postWrapper}
                    key={post._id}
                    onClick={() => handlePostCardClick(post)}
                  >
                    <img
                      src={post.image}
                      alt='post'
                      className={classes.postImage}
                    />
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  item
                  xs={12}
                  justify='center'
                  direction='column'
                  className={classes.noPostsContainer}
                >
                  <CameraAltIcon
                    className={classes.noPostsIcon}
                    fontSize='large'
                  />
                  <Grid item className={classes.noPostsText}>
                    No Posts Yet
                  </Grid>
                </Grid>
              )
            ) : (
              Array(9)
                .fill(undefined)
                .map((arr, index) => (
                  <Grid item xs={4} className={classes.postWrapper}>
                    <Skeleton
                      key={index}
                      className={classes.skeleton}
                      classes={{
                        wave: classes.wave,
                      }}
                      animation='wave'
                    />
                  </Grid>
                ))
            )}
          </Grid>
          <Grid container item xs={12}>
            {snackBarMessage && (
              <SnackBar
                open={showSnackBar}
                message={snackBarMessage}
                handleClose={() => toggleSnackBarConnect('')}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    )
  else return <Spinner />
}

const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.user._id,
    user: state.user.user,
    userloading: state.user.loading,
    postloading: state.post.loading,
    selectedUserPosts: state.post.selectedUserPosts,
    selectedUser: state.user.getUser,
    showSnackBar: state.user.showSnackBar,
    snackBarMessage: state.user.snackBarMessage,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<PostActions, {}, any>) => {
  return {
    getPostByUserIdConnect: (userId: string) =>
      dispatch(getPostByUserId(userId)),
    getUserByIdConnect: (userId: string) => dispatch(getUserById(userId)),
    toggleSnackBarConnect: (message: string) =>
      dispatch(toggleSnackBar(message)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
