import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Card, CardHeader, CardContent } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    boxSizing: 'border-box',
    margin: 0,
    background: theme.palette.primary.main,
  },
  media: {
    height: 350,
  },
  wave: {
    background: 'rgba(250,69,0,0.1)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, rgba(250,69,0,0.1) , transparent)`,
    },
  },
}))

const PostSkeleton: React.FC<{}> = () => {
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
        {Array(6)
          .fill(undefined)
          .map((arr, index) => (
            <Skeleton
              key={index}
              animation='wave'
              height={50}
              style={{ marginBottom: 6 }}
              classes={{
                wave: classes.wave,
              }}
            />
          ))}
      </CardContent>
    </Card>
  )
}

export default PostSkeleton

PostSkeleton.propTypes = {
  loading: PropTypes.bool,
}
