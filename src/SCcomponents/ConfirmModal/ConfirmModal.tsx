import React from 'react'
import { makeStyles } from '@material-ui/core'
import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  ModalSubHeader,
  ModalButton,
} from './ConfirmModal.styles'

interface IProps {
  open: boolean
  header: string
  subHeader?: string | null
  confirm: string
  onConfirm: () => void
  onCancel?: () => void
  handleClose: () => void
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      stiffness: 220,
      type: 'spring',
      mass: 0.5,
    },
  },
}

const useStyles = makeStyles((theme) => ({
  button: {
    background: `rgba(250,115,7,0.125)`,
    marginBottom: '5px',
    '&:hover': {
      background: `rgba(250,115,7,0.125)`,
    },
  },
}))

const ConfirmModal: React.FC<IProps> = ({
  open,
  header,
  subHeader,
  confirm,
  onConfirm,
  onCancel,
  handleClose,
}) => {
  const classes = useStyles()

  return open ? (
    <BackDrop onClick={handleClose}>
      <ModalWrapper
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <ModalHeader>{header}</ModalHeader>
        {subHeader && <ModalSubHeader>{subHeader}</ModalSubHeader>}
        {onCancel && (
          <ModalButton className={classes.button} onClick={onCancel}>
            Cancel
          </ModalButton>
        )}
        {onConfirm && (
          <ModalButton className={classes.button} onClick={onConfirm}>
            {confirm}
          </ModalButton>
        )}
      </ModalWrapper>
    </BackDrop>
  ) : null
}

export default ConfirmModal
