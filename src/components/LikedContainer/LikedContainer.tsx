import React from 'react'
import { Grid, Avatar } from '@material-ui/core'

import useStyles from './LikedContainer.styles'

interface IProps {
  avatars: any[]
  firstUser: string
  likeNumber: string
}

const LikedContainer: React.FC<IProps> = ({
  avatars,
  firstUser,
  likeNumber,
}) => {
  const classes = useStyles()
  return (
    <Grid container item xs={12}>
      <Grid container item xs={12}>
        <Grid container item xs={6}>
          {avatars.map((avatar, index) => (
            <Avatar
              alt='alt'
              src='/broken-image.jpg'
              className={classes.avatar}
            />
          ))}
        </Grid>
        <Grid container item xs={6}>
          liked by {firstUser} and {likeNumber}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LikedContainer
