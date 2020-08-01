import React from 'react'
import { Grid, Avatar } from '@material-ui/core'

import useStyles from './LikedContainer.styles'

interface IProps {
  avatars: any[]
  likeNumber: string | number
}

const LikedContainer: React.FC<IProps> = ({ avatars, likeNumber }) => {
  const classes = useStyles()
  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12}>
        <Grid container item xs={12} className={classes.avatarGroup}>
          {avatars.map((avatar, index) => (
            <Avatar
              key={avatar._id}
              alt={avatar.username}
              src={avatar.avatar.url}
              className={
                index === 0
                  ? `${classes.avatar}`
                  : `${classes.avatar} ${classes.leftAvatar}`
              }
            />
          ))}
          <span
            className={
              likeNumber === 0
                ? `${classes.text}`
                : `${classes.text} ${classes.leftAvatar}`
            }
          >
            liked by <strong>{avatars[0].username} </strong>
            {likeNumber !== 0 && (
              <>
                and <strong>{likeNumber} other</strong>
              </>
            )}
          </span>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LikedContainer
