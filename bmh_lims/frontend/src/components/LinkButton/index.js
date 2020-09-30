import React from 'react'
import { StyledLink } from './Styles'

const LinkButton = ({ styles, text, path }) => {
    return (
        <StyledLink styles={styles} to={path}>
            {text}
        </StyledLink>
    )
}

export default LinkButton
