import React, { FocusEvent, ChangeEvent } from 'react'
import { TF, TFWrapper } from './TextField.styles'

interface IProps {
  id: string
  name: string
  type: string
  placeholder: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
}

const TextField: React.FC<IProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <TFWrapper>
      <TF
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </TFWrapper>
  )
}

export default TextField
