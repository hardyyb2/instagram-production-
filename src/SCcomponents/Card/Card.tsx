import React from 'react'
import { makeStyles } from '@material-ui/core'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { motion } from 'framer-motion'

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
  CardStatsContainer,
  CardStatsLikes,
  CardStatsComments,
  CommentsContainer,
  CommentsButton,
} from './Card.styles'
import { postProps } from '../../store/actions'
import { timeDifference } from '../../utils/helpers'
import { LikedContainer, Caption } from '../../components'

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
  like: {
    fontSize: '2.2rem',
  },
  comments: {
    fontSize: '2rem',
  },
  noRightPadding: {
    paddingRight: '0px',
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
    first3Likes,
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
            <LikesContainer whileTap={{ scale: 1.2 }}>
              <CardIconButton
                onClick={handleLikeClick}
                aria-label='like'
                className={classes.noRightPadding}
              >
                {isLiked ? (
                  <FavoriteIcon
                    className={`${classes.liked} ${classes.like}`}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon className={classes.like} />
                )}
              </CardIconButton>
            </LikesContainer>
            <CommentsNumberContainer>
              <CardIconButton
                onClick={handleCommentClick}
                aria-label='comments'
              >
                <ChatBubbleOutlineOutlinedIcon className={classes.comments} />
              </CardIconButton>
            </CommentsNumberContainer>
          </CardFooter>
          <CardStatsContainer>
            <CardStatsLikes>
              {first3Likes.length !== 0 && (
                <LikedContainer
                  avatars={first3Likes}
                  likeNumber={post.likes.length - 1}
                />
              )}
            </CardStatsLikes>
            <CardStatsComments>
              <Caption
                userName={post.postedBy.username}
                caption={post.caption}
              />
            </CardStatsComments>
          </CardStatsContainer>
          {post.comments.length > 0 && (
            <CommentsContainer>
              <CommentsButton onClick={handleCommentClick}>
                See {post.comments.length} Comments
              </CommentsButton>
            </CommentsContainer>
          )}
        </CardWrapper>
      </CardPaper>
    </CardContainer>
  )
}

export default Card
