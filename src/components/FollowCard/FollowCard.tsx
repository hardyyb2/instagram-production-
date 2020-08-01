import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import { isEmpty, find } from 'lodash'

import {
  HeaderImageContainer,
  HeaderImage,
} from '../../SCcomponents/Card/Card.styles'
import useStyles from './FollowCard.styles'
import { UserProps, userFeedUsers } from '../../store/actions'
import { FollowButton } from '..'
import { FollowCardSkeleton } from '../../UX'

interface IProps {
  userFeed: userFeedUsers[] | null
  user: UserProps
}

const FollowCard: React.FC<IProps> = ({ userFeed, user }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleProfileRedirect = (user: userFeedUsers) => {
    history.push({
      pathname: `/profile`,
      search: `user=${user.username}&userId=${user._id}`,
    })
  }

  const findExistence = (userId: string) => {
    let payload = {
      userId,
      follow: true,
    }
    if (
      find(user.following, ['_id', userId]) ||
      user.following.includes(userId)
    ) {
      payload.follow = false
    }
    return payload
  }

  return (
    <Grid container item xs={12} className={classes.container}>
      {userFeed ? (
        !isEmpty(userFeed) ? (
          userFeed.map((userF, index) => (
            <Grid
              container
              item
              xs={6}
              className={classes.root}
              key={userF._id}
            >
              <Paper elevation={5} className={classes.paper}>
                <Grid
                  container
                  item
                  className={classes.wrapper}
                  justify='center'
                  direction='column'
                >
                  <HeaderImageContainer
                    size={'80px'}
                    className={classes.image}
                    onClick={() => handleProfileRedirect(userF)}
                  >
                    <HeaderImage src={userF.avatar.url} alt={userF.username} />
                  </HeaderImageContainer>
                  <Grid
                    item
                    className={classes.username}
                    onClick={() => handleProfileRedirect(userF)}
                  >
                    {userF.username}
                  </Grid>
                  <Grid
                    container
                    justify='center'
                    className={classes.followButtonWrapper}
                  >
                    <FollowButton
                      payload={findExistence(userF._id)}
                      design={classes.followButton}
                      requesting={
                        !!find(user.requesting, ['_id', userF._id]) ||
                        user.requesting.includes(userF._id)
                      }
                      follows={
                        !!find(user.following, ['_id', userF._id]) ||
                        user.following.includes(userF._id)
                      }
                    />
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
          <FollowCardSkeleton />
        </Grid>
      )}
    </Grid>
  )
}

export default FollowCard
