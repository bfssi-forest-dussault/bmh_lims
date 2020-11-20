import styled from 'styled-components'

export const CircularButton = styled.button`
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colour5};
    width: 7rem;
    height: 7rem;
    color: white;
    font-size: 1.3em;
    &:hover {
        width: 7.1em;
        height: 7.1em;
    }
    transition: width 0.7s, height 0.7s;
`

export const DecorativeBar = styled.div`
    width: 20%;
    height: 10px;
    background-color: ${props => props.theme.colour5};
`

export const CircularButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`