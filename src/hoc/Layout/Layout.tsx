import React from 'react'
import { Grid } from '@material-ui/core'

import useStyles from './Layout.styles'
import { BottomNavigation } from '../../components'

const Layout: React.FC<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid container item xs={12} direction='column' className={classes.root}>
      <Grid container item xs={12} className={classes.body}>
        {children}
      </Grid>
      <Grid container item xs={12} className={classes.navigation}>
        <BottomNavigation />
      </Grid>
    </Grid>
  )
}

export default Layout
