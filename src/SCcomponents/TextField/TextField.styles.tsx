import styled from 'styled-components'
import { Box } from '@material-ui/core'
import { theme } from '../../UX/UITheme/colors'

export const TFWrapper = styled(Box)`
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
`

export const TF = styled.input`
  font-size: 0.9rem;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  border-radius: 4px;
  color: ${theme.palette.primary.dark};
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: ${theme.palette.primary.light};
  }
`
