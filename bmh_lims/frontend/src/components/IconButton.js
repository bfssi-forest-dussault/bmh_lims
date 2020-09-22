import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
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

const IconButton = ({text, IconSVG, animation, iconProps, onClickHandler}) => {
    return (
        <StyledButton onClick={onClickHandler} animation={animation} >
            <IconContainer height={iconProps.height} width={iconProps.width}>
                <IconSVG {...iconProps} />
            </IconContainer>
            {text}
        </StyledButton>
    )
}

export default IconButton
