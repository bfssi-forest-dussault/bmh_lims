import styled from 'styled-components'

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 200px;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    border: solid 2px ${props => props.theme.secondarybg};
    align-self: center;
    z-index: 501;
`

export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`

export const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;
`

export const ButtonContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
`

export const InfoContainer = styled.div`
    width: 100%;
    overflow: auto;
    max-height: 70px;
    border-radius: 3px;
    border: solid 2px ${props => props.theme.primarybg};
`
