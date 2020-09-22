import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background: rgb(50, 100, 150);
    color: rgb(255, 255, 255);
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
