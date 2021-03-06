import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import Badge from '@material-ui/core/Badge'

import useStyles from './BottomNavigation.styles'
import { IState } from '../../store/types'
import { userFeedUsers } from '../../store/actions'

interface IProps {
  username: string
  userId: string
  requested: (string | userFeedUsers)[]
}

const BottomNavigation: React.FC<IProps> = ({
  username,
  userId,
  requested,
}) => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const handleHomeClick = () => {
    if (location.pathname !== '/home') history.push('/home')
  }

  const handleExploreClick = () => {
    if (location.pathname !== '/explore') history.push('/explore')
  }
  const handleAddPostClick = () => {
    if (location.pathname !== '/addpost') history.push('/addpost')
  }

  const handleProfileClick = () => {
    if (location.pathname !== '/profile' || !location.search.includes(userId))
      history.replace({
        pathname: '/profile',
        search: `user=${username}&userId=${userId}`,
      })
  }

  const handleActivityClick = () => {
    if (location.pathname !== '/activity') history.push('/activity')
  }

  return (
    <Grid
      container
      item
      xs={12}
      justify='space-evenly'
      direction='row'
      className={classes.root}
    >
      <Grid item container xs={2} className={classes.container}>
        <Button onClick={handleHomeClick} className={classes.button}>
          <HomeIcon fontSize='large' />
        </Button>
      </Grid>
      <Grid item container xs={2} className={classes.container}>
        <Button onClick={handleExploreClick} className={classes.button}>
          <SearchIcon fontSize='large' />
        </Button>
      </Grid>
      <Grid item container xs={2} className={classes.container}>
        <Button onClick={handleAddPostClick} className={classes.button}>
          <AddIcon fontSize='large' className={classes.addIcon} />
        </Button>
      </Grid>

      <Grid item container xs={2} className={classes.container}>
        <Button onClick={handleActivityClick} className={classes.button}>
          <Badge
            badgeContent={requested.length}
            className={classes.badge}
            color='secondary'
          >
            <FavoriteIcon fontSize='large' />
          </Badge>
        </Button>
      </Grid>

      <Grid item container xs={2} className={classes.container}>
        <Button onClick={handleProfileClick} className={classes.button}>
          <PersonIcon fontSize='large' />
        </Button>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.user ? state.user.user._id : '',
    username: state.user.user ? state.user.user.username : '',
    requested: state.user.user ? state.user.user.requested : '',
  }
}

export default connect(mapStateToProps)(BottomNavigation)
