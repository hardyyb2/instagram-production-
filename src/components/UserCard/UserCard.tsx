import React from 'react'
import { Grid } from '@material-ui/core'

import {
  HeaderImageContainer,
  HeaderImage,
} from '../../SCcomponents/Card/Card.styles'
import { userFeedUsers } from '../../store/actions'
import useStyles from './UserCard.styles'

interface IProps {
  users: (string | userFeedUsers)[] | null
}

const UserCard: React.FC<IProps> = ({ users }) => {
  const classes = useStyles()

  return (
    <Grid container item xs={12} className={classes.container}>
      {users &&
        users.map((user, index) =>
          typeof user === 'string' ? null : (
            <Grid
              container
              item
              xs={11}
              className={classes.root}
              key={user._id}
            >
              <HeaderImageContainer size={'40px'}>
                <HeaderImage src={user.avatar} alt={user.username} />
              </HeaderImageContainer>
              <Grid container item xs={8} className={classes.username}>
                {user.username}
              </Grid>
            </Grid>
          )
        )}
    </Grid>
  )
}

export default UserCard
