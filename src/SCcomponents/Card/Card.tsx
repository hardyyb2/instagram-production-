import React from 'react'
import { makeStyles } from '@material-ui/core'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import {
  CardContainer,
  CardWrapper,
  CardHeader,
  HeaderImageContainer,
  HeaderImage,
  HeaderTextContainer,
  HeaderTitle,
  HeaderSubTitle,
  CardImageContainer,
  CardImageWrapper,
  CardImage,
  CardFooter,
  LikesContainer,
  CommentsNumberContainer,
  CardPaper,
  CardIconButton,
  Count,
} from './Card.styles'
import { postProps } from '../../store/actions'
import { timeDifference } from '../../utils/helpers'

interface IProps {
  isLiked: boolean
  post: postProps
  _handleDoubleClick: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void
  handleUserNameClick: () => void
  handleLikeClick: () => void
  handleCommentClick: () => void
}

const useStyles = makeStyles((theme) => ({
  liked: {
    color: theme.palette.info.main,
  },
}))

const Card: React.FC<IProps> = ({
  isLiked,
  post,
  handleUserNameClick,
  _handleDoubleClick,
  handleLikeClick,
  handleCommentClick,
}) => {
  const classes = useStyles()
  const {
    _id: postId,
    image: postImage,
    caption: postCaption,
    postedBy: { avatar: userImage },
    postedBy: { username: userName },
    createdAt: time,
  } = post

  const getRelativeTime = (time: string): string => {
    return timeDifference(Date.parse(time))
  }

  return (
    <CardContainer container item xs={12} sm={4}>
      <CardPaper elevation={5}>
        <CardWrapper container item justify='center' direction='column'>
          <CardHeader container item justify='flex-start' direction='row'>
            <HeaderImageContainer>
              {userImage ? (
                <HeaderImage src={userImage} alt={userName} />
              ) : (
                <AccountCircleIcon />
              )}
            </HeaderImageContainer>
            <HeaderTextContainer onClick={handleUserNameClick}>
              <HeaderTitle>{userName}</HeaderTitle>
              <HeaderSubTitle>{getRelativeTime(time)}</HeaderSubTitle>
            </HeaderTextContainer>
          </CardHeader>
          <CardImageContainer pd={'12px'} onDoubleClick={_handleDoubleClick}>
            <CardImageWrapper>
              <CardImage src={postImage} alt={postCaption} />
            </CardImageWrapper>
          </CardImageContainer>
          <CardFooter container direction='row' justify='flex-start'>
            <LikesContainer>
              <CardIconButton onClick={handleLikeClick} aria-label='like'>
                {isLiked ? (
                  <FavoriteIcon className={classes.liked} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </CardIconButton>
              <Count>{post.likes.length}</Count>
            </LikesContainer>
            <CommentsNumberContainer>
              <CardIconButton
                onClick={handleCommentClick}
                aria-label='comments'
              >
                <ChatBubbleOutlineOutlinedIcon />
              </CardIconButton>
              <Count>{post.comments.length}</Count>
            </CommentsNumberContainer>
          </CardFooter>
        </CardWrapper>
      </CardPaper>
    </CardContainer>
  )
}

export default Card
