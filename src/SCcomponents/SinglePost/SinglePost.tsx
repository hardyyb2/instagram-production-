import React, { useRef, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, makeStyles, Button } from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'

import {
  Container,
  Wrapper,
  Background,
  CardHeader,
  BackButton,
  HeaderImageContainer,
  Menu,
  CardFooter,
  Count,
  CommentContainer,
  AddCommentContainer,
  NoCommentsContainer,
  NoPostsText,
} from './SinglePost.styles'
import {
  HeaderImage,
  CardImageContainer,
  CardImageWrapper,
  CardImage,
  LikesContainer,
  CommentsNumberContainer,
} from '../Card/Card.styles'
import { Comment, Menu as SMenu } from '../../components'
import { SCConfirmModal } from '..'

interface IProps {
  allowScroll: boolean
  isLiked: boolean
  userId: string
  userImage: string
  userName: string
  postImage: string
  postCaption: string
  likes: string[]
  comments: any[]
  handleLikeClick: () => void
  handleCommentClick: () => void
  handleDelete: (id: string) => void
  handleDeletePost: () => void
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
  },
  liked: {
    color: theme.palette.info.main,
  },
}))

const SinglePost: React.FC<IProps> = ({
  allowScroll,
  isLiked,
  userId,
  userImage,
  userName,
  postImage,
  postCaption,
  likes,
  comments,
  handleLikeClick,
  handleCommentClick,
  handleDelete,
  handleDeletePost,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [deletePostConfirm, setDeleteConfirmModal] = useState(false)

  const handleBackButton = () => history.goBack()

  const handleMenuClose = () => setAnchorEl(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const scrollIntoView = () => {
    if (lastMessageRef.current && allowScroll) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useLayoutEffect(scrollIntoView, [comments])

  const handleProfilePicClick = () => {
    history.push({
      pathname: `/profile`,
      search: `user=${userName}&userId=${userId}`,
    })
  }

  const toggleDeleteModal = () => setDeleteConfirmModal(!deletePostConfirm)

  const handleDeleteClick = () => {
    toggleDeleteModal()
    handleMenuClose()
  }

  const menuItems = [
    {
      title: 'Delete',
      icon: 'delete',
      color: 'red',
      handleClick: handleDeleteClick,
    },
  ]
  return (
    <Container>
      <CardHeader container justify='space-between'>
        <BackButton onClick={handleBackButton}>
          <IconButton aria-label='back' className={classes.iconButton}>
            <ArrowBackIcon />
          </IconButton>
        </BackButton>
        <HeaderImageContainer onClick={handleProfilePicClick}>
          <HeaderImage src={userImage} alt={userName} />
        </HeaderImageContainer>
        <Menu>
          <IconButton
            aria-label='menu'
            className={classes.iconButton}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <SMenu
            anchorEl={anchorEl}
            handleClose={handleMenuClose}
            menuItems={menuItems}
          />
        </Menu>
      </CardHeader>
      <Wrapper image={postImage}>
        <Background>
          <CardImageContainer pd={'20px'}>
            <CardImageWrapper>
              <CardImage src={postImage} alt={postCaption} />
            </CardImageWrapper>
          </CardImageContainer>
          <CardFooter container justify='flex-start'>
            <LikesContainer>
              <IconButton
                aria-label='like'
                onClick={handleLikeClick}
                className={classes.iconButton}
              >
                {isLiked ? (
                  <FavoriteIcon className={classes.liked} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <Count>{likes.length}</Count>
            </LikesContainer>
            <CommentsNumberContainer>
              <IconButton
                aria-label='comment'
                onClick={handleCommentClick}
                className={classes.iconButton}
              >
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
              <Count>{comments.length}</Count>
            </CommentsNumberContainer>
          </CardFooter>
        </Background>
      </Wrapper>
      <CommentContainer container item xs={12} direction='column'>
        {comments.length === 0 ? (
          <NoCommentsContainer
            container
            item
            xs={12}
            justify='center'
            direction='column'
          >
            <HourglassEmptyIcon fontSize='large' />
            <NoPostsText item>No Comments Yet</NoPostsText>
          </NoCommentsContainer>
        ) : (
          comments.map((comment, index) => (
            <Comment
              userId={userId}
              key={comment._id}
              comment={comment}
              deleteComment={() => handleDelete(comment._id)}
            />
          ))
        )}
        <div ref={lastMessageRef} />
      </CommentContainer>
      <AddCommentContainer />
      <SCConfirmModal
        open={deletePostConfirm}
        header={'Delete Post'}
        subHeader={'Once deleted, post cannot be retrieved again.'}
        confirm={'Delete'}
        onConfirm={handleDeletePost}
        onCancel={toggleDeleteModal}
        handleClose={toggleDeleteModal}
      />
    </Container>
  )
}

export default SinglePost
