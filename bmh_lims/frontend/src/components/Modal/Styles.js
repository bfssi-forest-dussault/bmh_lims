import styled, { keyframes } from 'styled-components'

const modalAnimation = keyframes`
    from {
        transform: scale(0.9);
        opacity: 0;
    } to {
        transform: scale(1);
        opacity: 1;
    }
`

export const StyledModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    max-height: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    border: solid 2px ${props => props.theme.secondarybg};
    align-self: center;
    z-index: 501;
    animation: ${modalAnimation} 0.1s linear 1;
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
    max-height: 100%;
    border-radius: 3px;
    border: solid 2px ${props => props.theme.primarybg};
`
