import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
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

export const StyledDiv = styled.div`
    ${props => props.animation}
`
