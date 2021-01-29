import styled from 'styled-components'
// keyframes imported to assign section

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    align-items: center;
`

export const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${props => props.theme.colour2};
    border-bottom: 2px solid ${props => props.theme.colour2};
    color: white;
    align-items: center;
    min-height: 7%;
`
