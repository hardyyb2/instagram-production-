import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Grid, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { SCCard } from '../../SCcomponents'
import { IState } from '../../store/types'
import {
  postProps,
  PostActions,
  addLike,
  removeLike,
  userFeedUsers,
} from '../../store/actions'
import useStyles from './Cards.styles'

interface IProps {
  userId: string
  posts: postProps[]
  addLikeConnect: (postId: string) => void
  removeLikeConnect: (postId: string) => void
}

const Cards: React.FC<IProps> = ({
  userId,
  posts,
  addLikeConnect,
  removeLikeConnect,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const getLikeStatus = (post: postProps) => {
    return post.likes.includes(userId)
  }

  const handleUserNameClick = (postedBy: userFeedUsers) =>
    history.push({
      pathname: `/profile`,
      search: `user=${postedBy.username}&userId=${postedBy._id}`,
    })

  const handleLikeClick = (post: postProps) => {
    post.likes.includes(userId)
      ? removeLikeConnect(post._id)
      : addLikeConnect(post._id)
  }

  const _handleDoubleClick = (post: postProps) => {
    if (!post.likes.includes(userId)) addLikeConnect(post._id)
  }

  const handleCommentClick = (postId: string) => {
    history.push({
      pathname: `/post`,
      search: `postId=${postId}`,
    })
  }

  return (
    <Grid container item xs={12} sm={12} className={classes.root}>
      {posts.map((post, index) => (
        <SCCard
          key={post._id + index}
          isLiked={getLikeStatus(post)}
          post={post}
          handleLikeClick={() => handleLikeClick(post)}
          _handleDoubleClick={(event) => _handleDoubleClick(post)}
          handleUserNameClick={() => handleUserNameClick(post.postedBy)}
          handleCommentClick={() => handleCommentClick(post._id)}
        />
      ))}
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.user._id,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<PostActions, {}, any>) => {
  return {
    addLikeConnect: (postId: string) => dispatch(addLike(postId)),
    removeLikeConnect: (postId: string) => dispatch(removeLike(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
