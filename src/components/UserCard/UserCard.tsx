import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import {
  HeaderImageContainer,
  HeaderImage,
} from '../../SCcomponents/Card/Card.styles'
import { userFeedUsers } from '../../store/actions'
import useStyles from './UserCard.styles'

interface IProps {
  users: (string | userFeedUsers)[] | null
  showAcceptButton?: boolean
  handleAcceptRequest?: (userId: string) => void
  handleRejectRequest?: (userId: string) => void
}

const UserCard: React.FC<IProps> = ({
  users,
  showAcceptButton,
  handleAcceptRequest,
  handleRejectRequest,
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
                xs={showAcceptButton ? 6 : 8}
                className={classes.username}
                onClick={() => handleUserClick(user)}
              >
                {user.username}
              </Grid>
              {showAcceptButton &&
                !!handleAcceptRequest &&
                !!handleRejectRequest && (
                  <Grid
                    container
                    item
                    xs={4}
                    direction='row'
                    className={classes.actions}
                  >
                    <Grid container item xs={8}>
                      <Button
                        onClick={() => handleAcceptRequest(user._id)}
                        className={classes.acceptButton}
                      >
                        Accept
                      </Button>
                    </Grid>
                    <Grid container item xs={4}>
                      <IconButton onClick={() => handleRejectRequest(user._id)}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
            </Grid>
          )
        )}
    </Grid>
  )
}

export default UserCard
