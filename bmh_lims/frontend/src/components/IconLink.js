import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    width: ${props => props.width || 'auto'};
    background-color: Transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: None;
    ${props => props.animation}
`

const IconContainer = styled.div`
    width: ${props => props.width || '50px'};
    height: ${props => props.height || '50px'};
`

const StyledDiv = styled.div`
    ${props => props.animation}
`

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
