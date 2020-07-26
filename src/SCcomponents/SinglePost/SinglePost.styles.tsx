import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { theme } from '../../UX/UITheme/colors'

export const Container = styled(Grid)`
  overflow-y: auto;
  height: 100%;
`

export const Wrapper = styled(Grid)<{ image: string }>`
  background: url(${(props) => (props.image ? props.image : '')}) no-repeat
    center center fixed;
  background-size: cover;
  border-radius: 0px 0px 30px 30px;
  overflow: hidden;
  padding-top: 60px;
`

export const Background = styled(Grid)`
  backdrop-filter: blur(40px);
  padding-bottom: 20px;
`

export const CardHeader = styled(Grid)`
  padding: 10px;
  position: absolute;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 10;
`

export const HeaderImageContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border: 4px solid #fff;
`

export const BackButton = styled.span``
export const Menu = styled.span``

export const CardFooter = styled(Grid)`
  padding-left: 20px;
  margin-top: -20px;
`
export const Count = styled.span`
  font-weight: bold;
  color: ${theme.palette.primary.light};
  margin: auto;
`
export const CommentContainer = styled(Grid)`
  padding: 30px 20px;
  padding-bottom: 120px;
`

export const AddCommentContainer = styled(Grid)``

export const NoCommentsContainer = styled(Grid)`
  align-items: center;
  svg {
    color: ${theme.palette.warning.dark};
    border: 2px solid ${theme.palette.warning.dark};
    padding: 20px;
    fontsize: 60px;
    border-radius: 50%;
  }
`

export const NoPostsText = styled(Grid)`
  color: ${theme.palette.warning.dark};
  font-size: 1.4rem;
`
