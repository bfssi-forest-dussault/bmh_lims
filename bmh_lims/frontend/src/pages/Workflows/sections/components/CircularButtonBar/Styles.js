import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const CircularButton = styled(Link)`
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colour5};
    width: 130px;
    height: 130px;
    color: white !important;
    font-size: 1.3em;
    text-align: center;
  line-height: 130px;
  box-sizing: border-box;
    &:hover {
        box-shadow: 0px 3px 7px 4px rgb(10, 60, 90, 0.2);
        background-color: #c65612;
    }
    //transition: width 0.7s, height 0.7s;
`

export const DecorativeBar = styled.div`
    width: 20%;
    height: 7px;
    background-color: ${props => props.theme.colour5};
`

export const CircularButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`
