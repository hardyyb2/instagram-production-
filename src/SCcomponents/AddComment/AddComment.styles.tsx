import styled from 'styled-components'
import { TextareaAutosize } from '@material-ui/core'
import { theme } from '../../UX/UITheme/colors'

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background: white;
  align-items: center;
  padding: 20px 20px 30px 20px;
  border-radius: 35px 35px 0px 0px;
  overflow: hidden;
  box-shadow: 0 -10px 20px 10px rgba(0, 0, 0, 0.12);
`
export const Wrapper = styled.div`
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 20px;
  border: 0.1px solid rgba(0, 0, 0, 0.12);
`

export const TextBoxWrapper = styled.div`
  width: 60%;
  margin: auto;
`
export const TextBox = styled(TextareaAutosize)`
  overflow: hidden;
  width: 100%;
  height: 30px;
  font-size: 1.3rem;
  border: none;
  outline: none;
  &::placeholder {
    color: ${theme.palette.warning.light};
  }
`
export const ImageWrapper = styled.div`
  width: 15%;
  margin-bottom: auto;
`
export const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  margin: auto;
`
export const Image = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`
export const SendWrapper = styled.div`
  overflow: hidden;
  width: 20%;
  border-radius: 20px;
  color: white;
  text-align: center;
  button {
    color: ${theme.palette.primary.main};
    background: ${theme.palette.secondary.main};
    padding: 5px;
    width: 100%;
    height: 100%;
    border-radius: 0px;
    &:disabled {
      color: ${theme.palette.primary.light};
      background: lightgray;
    }
  }
`
