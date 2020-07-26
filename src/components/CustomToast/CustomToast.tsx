import React, { useEffect } from 'react'
import { ToastContainer, ToastContent, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IProps {
  myMsg: ToastContent
  type?: 'info' | 'success' | 'warning' | 'error' | 'default' | 'dark'
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
    | undefined
  onClose?: () => void
}

const CustomToast: React.FC<IProps> = ({
  myMsg,
  type = 'default',
  position = 'bottom-right',
  onClose,
}) => {
  useEffect(() => {
    toast(myMsg, {
      position: position,
      autoClose: 5000,
      type: type,
      onClose: onClose,
    })
  }, [myMsg, position, type, onClose])

  return <ToastContainer />
}

export default CustomToast
