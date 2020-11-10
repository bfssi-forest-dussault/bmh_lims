import styled from 'styled-components'

export const DropdownBar = styled.div`
    width: 80%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid ${props => props.theme.colour4};
    border-radius: 3%;
    padding: 0px 1.5%;
    color: ${props => props.theme.colour3}
    overflow: hidden;
`

export const DropdownMenu = styled.div`
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    left: ${props => props.left ? `${props.left}px`:'28px'};
    top: ${props => props.top ? `${props.top}px`: '0px'};
    z-index: 1;
    width: 83.5%;
    background-color: white;
`

export const DropdownButtonBackground = styled.div`
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: ${props => props.theme.colour2};
    border-left: 1px solid ${props => props.theme.colour4};
`

export const DropdownMenuItem = styled.div`
    border: 1px solid ${props => props.theme.colour4};
    padding: 0px 1.5%;
    color: ${props => props.theme.colour2};
    &: hover {
        background-color: ${props => props.theme.colour4};
        color: white;
    }
`

export const DropdownContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    flex-direction: column;
`