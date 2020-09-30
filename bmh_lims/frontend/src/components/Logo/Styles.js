import styled from 'styled-components'

export const LogoContainer = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    align-items: center;
`

// TODO: convert full logo into its own SVG.
export const NameText = styled.h1`
    font-size: ${props => props.width}px;
`
