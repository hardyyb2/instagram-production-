import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'

import useStyles from './BottomNavigation.styles'

const BottomNavigation = () => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const handleHomeClick = () => {
    if (location.pathname !== '/home') history.push('/home')
  }

  const handleProfileClick = () => {
    if (location.pathname !== '/profile') history.push('/profile')
  }

  const handleExploreClick = () => {}
  const handleActivityClick = () => {}

  return (
    <Grid
      container
      item
      xs={12}
      justify='space-evenly'
      direction='row'
      className={classes.root}
    >
      <Grid item container xs={3} className={classes.container}>
        <Button onClick={handleHomeClick} className={classes.button}>
          <HomeIcon fontSize='large' />
        </Button>
      </Grid>
      <Grid item container xs={3} className={classes.container}>
        <Button
          onClick={handleExploreClick}
          className={classes.button}
          disabled
        >
          <SearchIcon fontSize='large' />
        </Button>
      </Grid>
      <Grid item container xs={3} className={classes.container}>
        <Button
          onClick={handleActivityClick}
          className={classes.button}
          disabled
        >
          <FavoriteIcon fontSize='large' />
        </Button>
      </Grid>

      <Grid item container xs={3} className={classes.container}>
        <Button onClick={handleProfileClick} className={classes.button}>
          <PersonIcon fontSize='large' />
        </Button>
      </Grid>
    </Grid>
  )
}

export default BottomNavigation
