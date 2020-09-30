import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const defaultStyle = css`
    background-color: rgb(0, 180, 200);
    color: white !important;
    border: none;
` 

export const StyledLink = styled(Link)`
    padding: 0.5em 1em;
    border-radius: 5px;
    font-size: 1em;
    ${props => props.styles || defaultStyle}
`
