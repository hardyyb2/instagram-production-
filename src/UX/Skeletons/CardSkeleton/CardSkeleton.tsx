import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Card, CardHeader, CardContent } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    boSizing: 'border-box',
    margin: theme.spacing(2),
    background: theme.palette.primary.main,
  },
  media: {
    height: 250,
  },
  wave: {
    background: 'rgba(250,69,0,0.1)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, rgba(250,69,0,0.1) , transparent)`,
    },
  },
}))

const HomePageSkeleton: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Skeleton
            classes={{
              wave: classes.wave,
            }}
            animation='wave'
            variant='circle'
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            classes={{
              wave: classes.wave,
            }}
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton
            classes={{
              wave: classes.wave,
            }}
            animation='wave'
            height={10}
            width='40%'
          />
        }
      />

      <Skeleton
        classes={{
          wave: classes.wave,
        }}
        animation='wave'
        variant='rect'
        className={classes.media}
      />

      <CardContent>
        <React.Fragment>
          <Skeleton
            animation='wave'
            height={20}
            style={{ marginBottom: 6 }}
            classes={{
              wave: classes.wave,
            }}
          />
          <Skeleton
            animation='wave'
            height={20}
            width='80%'
            classes={{
              wave: classes.wave,
            }}
          />

          <Skeleton
            animation='wave'
            height={20}
            width='80%'
            classes={{
              wave: classes.wave,
            }}
          />
          <Skeleton
            animation='wave'
            height={20}
            width='80%'
            classes={{
              wave: classes.wave,
            }}
          />
        </React.Fragment>
      </CardContent>
    </Card>
  )
}

export default HomePageSkeleton

HomePageSkeleton.propTypes = {
  loading: PropTypes.bool,
}
