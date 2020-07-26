import React, { useEffect } from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {
  Grid,
  IconButton,
  Typography,
  AppBar,
  makeStyles,
  Button,
} from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: theme.palette.primary.main,
    boxShadow: 'none',
  },
  camera: {
    color: theme.palette.warning.dark,
  },
  title: {
    color: theme.palette.warning.dark,
    fontSize: '1.8rem',
    fontFamily: 'cursive',
  },
  message: {
    color: theme.palette.warning.dark,
  },
  body: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  details: {
    padding: '30px 30px 5px 30px',
  },
  imageContainer: {
    width: '70px',
    height: '70px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    overflow: 'hidden',
    marginRight: '20px',
  },
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
  },
  userName: {
    fontSize: '1.4rem',
    fontWeight: 'bolder',
  },
  bio: {
    fontWeight: 'bold',
    color: theme.palette.warning.light,
  },
  editProfile: {
    padding: '10px 30px 30px 30px',
    display: 'flex',
  },
  editProfileButton: {
    color: theme.palette.secondary.dark,
    borderColor: theme.palette.secondary.dark,
    borderRadius: '8px',
    width: '100%',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    margin: '0px 30px 0px 30px',
    borderTop: `0.02px solid rgba(0,0,0,0.12)`,
    borderBottom: `0.02px solid rgba(0,0,0,0.12)`,
  },
  statsContainer: {
    alignItems: 'center',
    flex: '1 1 auto',
  },
  statsNumber: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
  },
  statsText: {
    fontWeight: 'bolder',
    color: theme.palette.warning.light,
  },
  actionButtons: {
    padding: '25px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 auto',
  },
  followButton: {
    background: `linear-gradient(to right, ${theme.palette.secondary.dark},${theme.palette.secondary.main})`,
    borderRadius: '12px',
    width: '80%',
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  messageButton: {
    background: theme.palette.warning.light,
    borderRadius: '12px',
    color: theme.palette.primary.main,
  },
  postContainer: {
    padding: '20px 10px',
    flex: '1 1 auto',
  },
  postWrapper: {
    padding: '5px',
    height: '120px',
    borderRadius: '25px',
    overflow: 'hidden',
  },
  postImage: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  wave: {
    background: 'rgba(250,69,0,0.1)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, rgba(250,69,0,0.1) , transparent)`,
    },
  },
  skeleton: {
    borderRadius: 20,
    height: '80px',
  },
  noPostsContainer: {
    alignItems: 'center',
  },
  noPostsIcon: {
    color: theme.palette.warning.dark,
    border: `2px solid ${theme.palette.warning.dark}`,
    padding: '20px',
    fontSize: '60px',
    borderRadius: '50%',
  },
  noPostsText: {
    color: theme.palette.warning.dark,
  },
}))

interface IProps {
  userId: string
  selectedUser: UserProps
  selectedUserPosts: postProps[] | null
  showSnackBar: boolean
  getPostByUserIdConnect: (userId: string) => void
  getUserByIdConnect: (userId: string) => void
  toggleSnackBarConnect: () => void
}

const Profile: React.FC<IProps> = ({
  userId,
  selectedUser,
  selectedUserPosts,
  showSnackBar,
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
        toggleSnackBarConnect()
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
        <Grid container item xs={12} sm={12} className={classes.actionButtons}>
          <Button className={classes.followButton} variant='contained'>
            Follow
          </Button>
          <IconButton className={classes.messageButton}>
            <TelegramIcon fontSize='large' />
          </IconButton>
        </Grid>
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
          <SnackBar
            open={showSnackBar}
            handleClose={toggleSnackBarConnect}
            message='Profile Updated'
          />
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
  }
}

const mapDispatchToProps = (dispatch: Dispatch<PostActions, {}, any>) => {
  return {
    getPostByUserIdConnect: (userId: string) =>
      dispatch(getPostByUserId(userId)),
    getUserByIdConnect: (userId: string) => dispatch(getUserById(userId)),
    toggleSnackBarConnect: () => dispatch(toggleSnackBar()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
