import React, { useState } from 'react'
import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

import { commentProps } from '../../store/actions'
import { SCConfirmModal } from '../../SCcomponents'
import useStyles from './Comment.styles'

interface IProps {
  comment: commentProps
  userId: string
  deleteComment: () => void
}

const Comment: React.FC<IProps> = ({ comment, userId, deleteComment }) => {
  const classes = useStyles()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const toggleModal = () => setConfirmDelete(!confirmDelete)

  return (
    <Grid container item id={comment._id} className={classes.root}>
      <Grid
        container
        item
        className={classes.wrapper}
        direction='row'
        justify='flex-start'
        xs={12}
      >
        <Grid container item xs={3} className={classes.imageContainer}>
          <img
            src={comment.postedBy.avatar}
            alt={comment.postedBy.username}
            className={classes.image}
          />
        </Grid>
        <Grid container item xs={7} direction='column' justify='flex-start'>
          <Grid item className={classes.user}>
            {comment.postedBy.username}
          </Grid>
          <Grid item className={classes.comment}>
            {comment.text}
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={1}
          justify='center'
          className={classes.deleteIcon}
        >
          {comment.postedBy._id === userId && (
            <IconButton onClick={toggleModal}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          )}

          <SCConfirmModal
            open={confirmDelete}
            header='Delete Comment'
            confirm='Ok'
            onConfirm={deleteComment}
            handleClose={toggleModal}
            onCancel={toggleModal}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Comment
