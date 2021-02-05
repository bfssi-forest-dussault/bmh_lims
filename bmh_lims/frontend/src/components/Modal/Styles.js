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
    justify-content: space-between;
    align-items: center;
    width: 500px;
    max-width: 100%;
    max-height: 100%;
    height: 300px;
    background-color: white;
    padding: 0;
    border-radius: 5px;
    //border: solid 2px ${props => props.theme.secondarybg};
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
export const ModalBody = styled.div`
    margin-bottom: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

`

export const ModalHead = styled.div`
    background: ${props => props.theme.warning };
    font-weight: 900;
    color: white;
    letter-spacing: 0.5px;
    font-size: 1.3rem;
    height: 20%;
    display: flex;
    align-items: center;
    padding-left: 10px;
`
export const ModalIcon = styled.span`
    color: white;
    margin-right: 3px;
    font-size: 1.2rem;
`
export const ButtonContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
`

export const InfoContainer = styled.div`
    max-width: 100%;
    overflow: auto;
    max-height: 100%;
    height: 65%;
    //border-radius: 3px;
    //border: solid 2px ${props => props.theme.primarybg};
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
