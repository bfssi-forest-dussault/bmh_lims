import React from 'react'
import { StyledButton, IconContainer } from './Styles'

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
