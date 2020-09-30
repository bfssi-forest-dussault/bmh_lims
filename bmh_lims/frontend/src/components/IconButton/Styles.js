import styled from 'styled-components'

export const StyledButton = styled.button`
    width: ${props => props.width || 'auto'};
    background-color: Transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: None;
    ${props => props.animation}
`

export const IconContainer = styled.div`
    width: ${props => props.width || '50px'};
    height: ${props => props.height || '50px'};
`
