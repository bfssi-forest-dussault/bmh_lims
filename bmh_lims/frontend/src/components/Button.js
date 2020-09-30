import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button`
    background: rgb(0, 180, 200);
    color: white;
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 5px;
    border: none;
`

const Button = ({ text, onClickHandler }) => {
    return (
        <StyledButton onClick={onClickHandler}>
            {text}
        </StyledButton>
    )
}

export default Button
