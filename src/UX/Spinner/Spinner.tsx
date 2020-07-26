import React from 'react'
import classes from './Spinner.module.css'
import { Grid } from '@material-ui/core'

const Spinner: React.FC = () => {
  return (
    <Grid
      container
      justify='center'
      direction='column'
      style={{ minHeight: '100vh' }}
    >
      <div className={classes.spinner}>
        <div className={classes.rect1}></div>
        <div className={classes.rect2}></div>
        <div className={classes.rect3}></div>
        <div className={classes.rect4}></div>
        <div className={classes.rect5}></div>
      </div>
    </Grid>
  )
}

export default Spinner
