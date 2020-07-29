import React from 'react'
import { makeStyles, Grid, Paper, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import useStyles from '../../../components/FollowCard/FollowCard.styles'

const styles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '25px',
  },
  wave: {
    background: 'rgba(250,69,0,0.1)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, rgba(250,69,0,0.1) , transparent)`,
    },
  },
}))

const FollowCardSkeleton: React.FC<{}> = () => {
  const classes = useStyles()
  const localClasses = styles()

  return (
    <Grid container item xs={12} className={classes.container}>
      {Array(9)
        .fill(undefined)
        .map((skeleton, index) => (
          <Grid container item xs={6} className={classes.root} key={index}>
            <Paper elevation={5} className={classes.paper}>
              <Grid
                container
                item
                className={classes.wrapper}
                justify='center'
                direction='column'
              >
                <Skeleton
                  animation='wave'
                  className={classes.image}
                  width='80%'
                  height={80}
                  classes={{
                    root: localClasses.root,
                    wave: localClasses.wave,
                  }}
                />

                <Grid item className={classes.username}>
                  <Skeleton
                    animation='wave'
                    className={classes.image}
                    width={50}
                    classes={{
                      root: localClasses.root,
                      wave: localClasses.wave,
                    }}
                  />
                </Grid>
                <Grid
                  container
                  justify='center'
                  className={classes.followButtonWrapper}
                >
                  <Skeleton
                    animation='wave'
                    height={20}
                    className={classes.image}
                    width='100%'
                    classes={{
                      root: localClasses.root,
                      wave: localClasses.wave,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
    </Grid>
  )
}

export default FollowCardSkeleton
