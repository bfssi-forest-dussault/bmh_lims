import React from 'react'
import { StyledButton } from './Styles'

const Button = ({ text, onClickHandler }) => {
    return (
        <StyledButton onClick={onClickHandler}>
            {text}
        </StyledButton>
    )
}

export { StyledButton } from './Styles'
export default Button
