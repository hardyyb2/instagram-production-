import React from 'react'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import {
  AvatarUpload,
  AvatarEdit,
  AvatarPreview,
  ImagePreview,
  Label,
  Input,
} from './ProfileImage.styles'

interface IProps {
  image: string
  size?: string
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileImage: React.FC<IProps> = ({ image, size, handleImageUpload }) => {
  return (
    <AvatarUpload>
      <AvatarEdit>
        <Input
          type='file'
          id='imageUpload'
          accept='.png, .jpg, .jpeg'
          onChange={handleImageUpload}
        />
        <IconButton>
          <Label htmlFor='imageUpload'>
            <EditIcon />
          </Label>
        </IconButton>
      </AvatarEdit>
      <AvatarPreview size={size}>
        <ImagePreview image={image} />
      </AvatarPreview>
    </AvatarUpload>
  )
}
export default ProfileImage
