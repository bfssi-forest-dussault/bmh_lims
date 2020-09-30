import React, { useState } from 'react'
import { Logo } from 'icons'
import styled from 'styled-components'

const LogoContainer = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    align-items: center;
`

// TODO: convert full logo into its own SVG.
const NameText = styled.h1`
    font-size: ${props => props.width}px;
`

const CombinedLogo = ({height, width}) => {
    const [containerWidth, setWidth] = useState(0)
    return (
    <LogoContainer height={height} width={width} ref={el => {
        if (el) {
            setWidth(el.getBoundingClientRect().width)
        }
    }}>
        <Logo fill='#00AAB2' height='100%' width='100%' />
        <NameText width={containerWidth / 6}>BMH LIMS</NameText>
    </LogoContainer>
)}

export default CombinedLogo
