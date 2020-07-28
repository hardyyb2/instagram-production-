import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import {
  HeaderImageContainer,
  HeaderImage,
} from '../../SCcomponents/Card/Card.styles'
import useStyles from './FollowCard.styles'
import { UserProps, userFeedUsers } from '../../store/actions'
import { FollowButton } from '..'
import { isEmpty } from 'lodash'

interface IProps {
  userFeed: userFeedUsers[] | null
  user: UserProps
}

const FollowCard: React.FC<IProps> = ({ userFeed, user }) => {
  const classes = useStyles()

  const findExistence = (userId: string) => {
    let payload = {
      userId,
      follow: true,
    }
    if (user.following.includes(userId)) {
      payload.follow = false
    }
    return payload
  }

  return (
    <Grid container item xs={12} className={classes.container}>
      {userFeed ? (
        !isEmpty(userFeed) ? (
          userFeed.map((user, index) => (
            <Grid container item xs={6} className={classes.root} key={user._id}>
              <Paper elevation={5} className={classes.paper}>
                <Grid
                  container
                  item
                  className={classes.wrapper}
                  justify='center'
                  direction='column'
                >
                  <HeaderImageContainer size={'80px'} className={classes.image}>
                    <HeaderImage src={user.avatar} alt={user.username} />
                  </HeaderImageContainer>
                  <Grid item className={classes.username}>
                    {user.username}
                  </Grid>
                  <Grid
                    container
                    justify='center'
                    className={classes.followButtonWrapper}
                  >
                    <FollowButton payload={findExistence(user._id)} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid container justify='center'>
            No Users to Follow
          </Grid>
        )
      ) : (
        <Grid container justify='center'>
          Loading...
        </Grid>
      )}
    </Grid>
  )
}

export default FollowCard
