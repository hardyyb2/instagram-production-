import React, { useEffect, useState } from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { IState } from '../../store/types'
import {
  PostActions,
  getPost,
  postProps,
  addComment,
  commentPayloadProps,
  removeComment,
  addLike,
  removeLike,
  deletePost,
  toggleSnackBar,
} from '../../store/actions'
import { SCSinglePost, SCAddComment } from '../../SCcomponents/'
import { PostSkeleton, Spinner } from '../../UX'

interface IProps {
  loading: boolean
  userId: string
  userAvatar: string
  userName: string
  selectedPost: postProps | null
  getPostByIdConnect: (postId: string) => void
  addCommentConnect: (payload: commentPayloadProps) => void
  deleteCommentConnect: (payload: commentPayloadProps) => void
  addLikeConnect: (postId: string) => void
  removeLikeConnect: (postId: string) => void
  handleDeletePostConnect: (postId: string) => any
  toggleSnackBarConnect: (message: string) => void
}

const Post: React.FC<IProps> = ({
  loading,
  userId,
  userAvatar,
  userName,
  selectedPost,
  getPostByIdConnect,
  addCommentConnect,
  deleteCommentConnect,
  addLikeConnect,
  removeLikeConnect,
  handleDeletePostConnect,
  toggleSnackBarConnect,
}) => {
  const location = useLocation()
  const history = useHistory()

  const [allowScroll, setAllowScroll] = useState(false)

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      if (params.get('postId')) {
        Promise.all([getPostByIdConnect(params.get('postId')!)])
      } else {
        history.push('/home')
      }
    } else {
      history.push('/home')
    }
  }, [])

  const getLikeStatus = (post: postProps) => {
    return post.likes.includes(userId)
  }

  const handleCommentClick = () => {}

  const handleLikeClick = () => {
    if (selectedPost?.likes)
      selectedPost.likes.includes(userId)
        ? removeLikeConnect(selectedPost._id)
        : addLikeConnect(selectedPost._id)
  }

  const handleAddComment = (comment: string) => {
    const payload = {
      postId: selectedPost!._id,
      comment: {
        text: comment,
      },
    }
    addCommentConnect(payload)
    setAllowScroll(true)
  }
  const handleDeleteComment = (id: string) => {
    const payload = {
      postId: selectedPost!._id,
      comment: {
        id,
      },
    }
    deleteCommentConnect(payload)
  }

  const handleDeletePost = async () => {
    const res = await handleDeletePostConnect(selectedPost!._id)
    if (res.success) {
      toggleSnackBarConnect('Post Deleted')
      history.replace('/profile')
    }
  }

  return (
    <>
      {selectedPost && !loading ? (
        <>
          <SCSinglePost
            key={selectedPost._id}
            userId={userId}
            isLiked={getLikeStatus(selectedPost)}
            postCaption={selectedPost.caption}
            comments={selectedPost.comments}
            likes={selectedPost.likes}
            postImage={selectedPost.image.url}
            userImage={selectedPost.postedBy.avatar.url}
            userName={selectedPost.postedBy.username}
            handleCommentClick={handleCommentClick}
            handleLikeClick={handleLikeClick}
            handleDelete={handleDeleteComment}
            handleDeletePost={handleDeletePost}
            allowScroll={allowScroll}
          />
          <SCAddComment
            userAvatar={userAvatar}
            userName={userName}
            handleAddComment={handleAddComment}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.user._id,
    userAvatar: state.user.user.avatar,
    userName: state.user.user.username,
    selectedPost: state.post.selectedPost,
    loading: state.post.loading,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<PostActions, {}, any>) => {
  return {
    getPostByIdConnect: (userId: string) => dispatch(getPost(userId)),
    addCommentConnect: (payload: commentPayloadProps) =>
      dispatch(addComment(payload)),
    deleteCommentConnect: (payload: commentPayloadProps) =>
      dispatch(removeComment(payload)),
    addLikeConnect: (postId: string) => dispatch(addLike(postId)),
    removeLikeConnect: (postId: string) => dispatch(removeLike(postId)),
    handleDeletePostConnect: (postId: string) => dispatch(deletePost(postId)),
    toggleSnackBarConnect: (message: string) =>
      dispatch(toggleSnackBar(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
