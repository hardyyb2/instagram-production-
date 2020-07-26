import styled from 'styled-components'
import { theme } from '../../UX/UITheme/colors'

export const AvatarEdit = styled.div``
export const Input = styled.input`
  display: none;
`
export const Label = styled.label``
export const AvatarPreview = styled.div`
  width: 192px;
  height: 192px;
  position: relative;
  border-radius: 25px;
  border: 6px solid #f8f8f8;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  > div {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`
export const ImagePreview = styled.div<{ image: string }>`
  background-image: url(${({ image }) => image});
`

export const AvatarUpload = styled.div`
  position: relative;
  max-width: 205px;
  margin: 10px auto;
  ${AvatarEdit} {
    position: absolute;
    right: -15px;
    z-index: 1;
    top: -15px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin-bottom: 0;
      border-radius: 15px;
      background: #ffffff;
      border: 1px solid ${theme.palette.secondary.dark};
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
      font-weight: normal;
      transition: all 0.2s ease-in-out;
      ${Label} {
        cursor: pointer;
        overflow: hidden;
        color: ${theme.palette.secondary.dark};
      }
      &:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
      }
      &:after {
        content: '';
        font-family: 'FontAwesome';
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
      }
    }
  }
`
