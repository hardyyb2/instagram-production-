import React from 'react'
import { Grid } from '@material-ui/core'

import useStyles from './Caption.styles'

interface IProps {
  userName: string
  caption: string
}

const Caption: React.FC<IProps> = ({ userName, caption }) => {
  const classes = useStyles()

  return (
    <Grid container item xs={12} className={classes.root}>
      <p>
        <strong>{userName}</strong>
        {caption}
      </p>
    </Grid>
  )
}

export default Caption
