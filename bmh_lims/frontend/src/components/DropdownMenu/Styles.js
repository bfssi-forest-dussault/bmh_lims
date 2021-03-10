import styled from 'styled-components'

export const DropdownBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1%;
    overflow: hidden;
    color: ${props => props.theme.secondarybg};
    border: 2px solid ${props => props.theme.secondarybg};
    border-radius: 5px;
  & p {
    padding: 7px;
    font-size: 1.1rem;
    margin-left: 10px;
  }
`

export const DropdownMenu = styled.div`
    max-height: ${props => props.isOpen ? '200px': '0px'};
    width: ${props => props.width || '100%'};
    overflow-y: auto;
    position: absolute;
    z-index: 1;
    background-color: white;
    transition: max-height 0.5s
`

export const DropdownButtonBackground = styled.div`
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: ${props => props.theme.secondarybg};
    border-left: 1.5px solid ${props => props.theme.secondarybg};
`

export const DropdownMenuItem = styled.div`
    border: 1px solid ${props => props.theme.secondarybg};
    padding: 3px 1.5%;
    color: ${props => props.theme.colour2};
    &: hover {
        background-color: ${props => props.theme.secondarybg};
        opacity: 0.5;
        color: white;
    }
`

export const DropdownContainer = styled.div`
    position: relative;
    width: ${props => props.width || '100%'};
    margin: 4% 0;
    display: inline-block;
    text-align: center;
`
