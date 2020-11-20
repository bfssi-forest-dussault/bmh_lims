import styled from 'styled-components'

export const CircularButton = styled.button`
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colour5};
    width: 120px;
    height: 120px;
    color: white;
    font-size: 1.3em;
    &:hover {
        width: 130px;
        height: 130px;
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