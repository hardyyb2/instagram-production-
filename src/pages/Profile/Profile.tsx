import React, { useEffect } from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
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
import { SnackBar } from '../../components'
import useStyles from './Profile.styles'

interface IProps {
  userId: string
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

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      if (params.get('userId')) {
        Promise.all([
          getPostByUserIdConnect(params.get('userId')!),
          getUserByIdConnect(params.get('userId')!),
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
  }, [])

  const handleBackClick = () => history.goBack()

  const handlePostCardClick = (post: postProps) =>
    history.push({
      pathname: `/post`,
      search: `postId=${post._id}`,
    })

  const handleEditProfile = () => history.push('/editprofile')

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
            <Button className={classes.followButton} variant='contained'>
              Follow
            </Button>
            <IconButton className={classes.messageButton}>
              <TelegramIcon fontSize='large' />
            </IconButton>
          </Grid>
        )}
        <Grid container item xs={12} sm={12} className={classes.postContainer}>
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
}

const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.user._id,
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
