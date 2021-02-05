import React from 'react'
import { ModalBackground, StyledModal, ButtonContainer, InfoContainer, ModalContainer, ModalBody, ModalHead, ModalIcon } from './Styles'
import { MultilineText } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

export const Modal = ({message, CloseButton, ActionButton, onBackgroundClick, info}) => {
    return (
        <ModalContainer>
            <ModalBackground onClick={e => {
                e.preventDefault()
                onBackgroundClick()
            }} />
            <StyledModal>
                <ModalBody>
                    <ModalHead >
                        <ModalIcon>< FontAwesomeIcon icon={faExclamationTriangle} className='icon'/></ModalIcon>
                        Error
                    </ModalHead>
                    <InfoContainer>
                    {message}
                    {!!info && (

                        <MultilineText text={info} />
                    )}</InfoContainer>
                </ModalBody>

                <ButtonContainer>
                    {ActionButton && <ActionButton />}
                    {CloseButton && <CloseButton />}
                </ButtonContainer>
            </StyledModal>
        </ModalContainer>
    )
}
