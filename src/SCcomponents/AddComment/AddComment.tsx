import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import TelegramIcon from '@material-ui/icons/Telegram'

import {
  Container,
  Wrapper,
  Image,
  ImageContainer,
  ImageWrapper,
  SendWrapper,
  TextBox,
  TextBoxWrapper,
} from './AddComment.styles'

interface IProps {
  userAvatar: string
  userName: string
  handleAddComment: (comment: string) => void
}

const AddComment: React.FC<IProps> = ({
  userAvatar,
  userName,
  handleAddComment,
}) => {
  const [comment, setComment] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value === '' ? setIsDisabled(true) : setIsDisabled(false)
    setComment(event.target.value)
  }

  const handleButtonClick = () => {
    handleAddComment(comment)
    setComment('')
  }

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <ImageContainer>
            <Image src={userAvatar} alt={userName} />
          </ImageContainer>
        </ImageWrapper>
        <TextBoxWrapper>
          <TextBox
            rowsMax={4}
            placeholder='Add a commment...'
            aria-label='add comment'
            value={comment}
            onChange={handleChange}
          />
        </TextBoxWrapper>
        <SendWrapper>
          <IconButton onClick={handleButtonClick} disabled={isDisabled}>
            <TelegramIcon fontSize='large' />
          </IconButton>
        </SendWrapper>
      </Wrapper>
    </Container>
  )
}

export default AddComment
