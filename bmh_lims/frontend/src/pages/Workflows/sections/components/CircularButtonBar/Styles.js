import styled from 'styled-components'

export const CircularButton = styled.button`
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colour5};
    width: 130px;
    height: 130px;
    color: white !important;
    font-size: 1.3em;

    &:hover {
        box-shadow: 0px 3px 7px 4px rgb(10, 60, 90, 0.2);
        background-color: #c65612;
    }
    &:focus {
      outline: none;
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
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
`
