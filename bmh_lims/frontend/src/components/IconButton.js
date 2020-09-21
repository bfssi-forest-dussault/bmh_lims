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

const SVGContainer = styled.div`
    width: ${props => props.width || '50px'};
    height: ${props => props.height || '50px'};
`

export const IconButton = ({text, IconSVG, animation, height, width, iconProps, onClickHandler}) => {
    return (
        <StyledButton onClick={onClickHandler} animation={animation} >
            <SVGContainer height={height} width={width}>
                <IconSVG {...iconProps} />
            </SVGContainer>
            {text}
        </StyledButton>
    )
}