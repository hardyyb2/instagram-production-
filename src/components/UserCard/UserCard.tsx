import React from 'react'
import { Grid, Button } from '@material-ui/core'

import {
  HeaderImageContainer,
  HeaderImage,
} from '../../SCcomponents/Card/Card.styles'
import { userFeedUsers } from '../../store/actions'
import useStyles from './UserCard.styles'
import { useHistory } from 'react-router-dom'

interface IProps {
  users: (string | userFeedUsers)[] | null
  showAcceptButton?: boolean
  handleAcceptRequest?: (userId: string) => void
}

const UserCard: React.FC<IProps> = ({
  users,
  showAcceptButton,
  handleAcceptRequest,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const handleUserClick = (user: userFeedUsers) => {
    history.push({
      pathname: '/profile',
      search: `user=${user.username}&userId=${user._id}`,
    })
  }

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
              <HeaderImageContainer
                size={'40px'}
                onClick={() => handleUserClick(user)}
              >
                <HeaderImage src={user.avatar} alt={user.username} />
              </HeaderImageContainer>
              <Grid
                container
                item
                xs={showAcceptButton ? 8 : 6}
                className={classes.username}
                onClick={() => handleUserClick(user)}
              >
                {user.username}
              </Grid>
              {showAcceptButton && !!handleAcceptRequest && (
                <Grid container item xs={2}>
                  <Button
                    onClick={() => handleAcceptRequest(user._id)}
                    className={classes.acceptButton}
                  >
                    Accept
                  </Button>
                </Grid>
              )}
            </Grid>
          )
        )}
    </Grid>
  )
}

export default UserCard
