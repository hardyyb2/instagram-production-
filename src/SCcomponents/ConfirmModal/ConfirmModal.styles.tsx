import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button } from '@material-ui/core'
import { theme } from '../../UX/UITheme/colors'

export const BackDrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`
export const ModalWrapper = styled(motion.div)`
  width: 60%;
  border-radius: 20px;
  background: white;
  color: ${theme.palette.secondary.dark};
  padding: 20px;
  z-index: 40;
`
export const ModalHeader = styled.h2`
  color: ${theme.palette.warning.dark};
  text-align: center;
  text-transform: capitalize;
`
export const ModalSubHeader = styled.h5`
  color: ${theme.palette.warning.light};
  text-align: center;
`
export const ModalButton = styled(Button)`
  color: ${theme.palette.secondary.dark};
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 8px 0;
`
