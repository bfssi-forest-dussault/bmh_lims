import React from 'react'
import { ModalBackground, StyledModal, ButtonContainer, InfoContainer, ModalContainer } from './Styles'
import { MultilineText } from 'components'

export const Modal = ({message, CloseButton, ActionButton, onBackgroundClick, info}) => {
    return (
        <ModalContainer>
            <ModalBackground onClick={e => {
                e.preventDefault()
                onBackgroundClick()
            }} />
            <StyledModal>
                {message}
                {!!info && (
                <InfoContainer>
                        <MultilineText text={info} />
                </InfoContainer>)}
                <ButtonContainer>
                    {ActionButton && <ActionButton />}
                    {CloseButton && <CloseButton />}
                </ButtonContainer>
            </StyledModal>
        </ModalContainer>
    )
}
