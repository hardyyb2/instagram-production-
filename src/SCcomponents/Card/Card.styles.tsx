import styled from 'styled-components'
import { Grid, Paper, IconButton, Button } from '@material-ui/core'
import { motion } from 'framer-motion'

import { theme } from '../../UX/UITheme/colors'

export const CardContainer = styled(Grid)`
  padding: 5px;
  margin-bottom: 10px;
`
export const CardPaper = styled(Paper)`
  width: 100%;
  border-radius: 25px;
  background: ${theme.palette.primary.main};
`

export const CardWrapper = styled(Grid)`
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
`
export const CardHeader = styled(Grid)`
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 15px;
  padding-bottom: 0px;
`

export const HeaderImageContainer = styled.div<{ size?: string }>`
  width: ${({ size }) => (size ? size : '50px')};
  height: ${({ size }) => (size ? size : '50px')};
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
`
export const HeaderImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`
export const HeaderTextContainer = styled(Grid)`
  padding-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const HeaderTitle = styled.span`
  font-weight: bold;
  color: ${theme.palette.warning.dark};
`
export const HeaderSubTitle = styled.span`
  font-size: 0.8rem;
  color: ${theme.palette.warning.light};
  font-weight: bold;
`

export const CardImageContainer = styled.div<{ pd: string }>`
  padding: ${({ pd }) => pd};
  border-radius: 25px;
  overflow: hidden;
  padding-bottom: 40px;
`
export const CardImageWrapper = styled.div`
  height: 320px;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 25px 30px -10px rgba(0, 0, 0, 0.7);
`
export const CardImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`
export const CardFooter = styled(Grid)`
  padding: 10px;
  margin-top: -40px;
  padding-bottom: 0px;
`

export const LikesContainer = styled(motion.div)`
  display: flex;
`
export const CommentsNumberContainer = styled(Grid)`
  display: flex;
`

export const Count = styled.span`
  font-weight: bold;
  margin: auto;
  color: ${theme.palette.warning.light};
`

export const CardCaption = styled(Grid)`
  padding: 5px 20px 10px;
  text-align: center;
  font-size: 1.2rem;
  background: linear-gradient(to right, #ff4301, #fa7d09);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  word-break: break-word;
`
export const CardIconButton = styled(IconButton)`
  color: ${theme.palette.warning.dark};
`
export const CardStatsContainer = styled(Grid)``
export const CardStatsLikes = styled(Grid)``
export const CardStatsComments = styled(Grid)``

export const CommentsContainer = styled.div`
  width: 100%;
  padding-top: 5px;
`

export const CommentsButton = styled(Button)`
  width: 100%;
  background: ${theme.palette.secondary.light};
  padding: 12px;
  border: none;
  font-weight: bolder;
  font-size: 1rem;
  color: ${theme.palette.secondary.dark};
  text-transform: capitalize;
`
