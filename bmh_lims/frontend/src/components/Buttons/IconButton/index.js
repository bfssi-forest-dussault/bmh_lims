import React from 'react'
import { StyledButton, IconContainer } from './Styles'
import {StyledLink} from "components/Buttons/IconLink/Styles";

const IconButton = ({text, IconSVG, animation, iconProps, onClickHandler}) => {
    return (
        <StyledButton onClick={onClickHandler} animation={animation} >
            <IconContainer height={iconProps.height} width={iconProps.width}>
                <IconSVG {...iconProps} />
            </IconContainer>
            <p style={{
                fontSize:'1.1rem',
                marginTop: '10px'
            }}>{text}</p>
        </StyledButton>
    )
}

export default IconButton
