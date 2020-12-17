import React from 'react'
import { StyledDiv, IconContainer, StyledLink } from './Styles'


const IconLink = ({text, path, IconSVG, animation, width, iconProps}) => {
    return (
        <StyledDiv animation={animation}>
            <StyledLink to={path} width={width}>
                <IconContainer height={iconProps.height} width={iconProps.width}>
                    <IconSVG {...iconProps} />
                </IconContainer>
                {text}
            </StyledLink>
        </StyledDiv>
    )
}

export default IconLink
