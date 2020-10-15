import React from 'react'
import { ModalBackground, Modal, ButtonContainer } from './Styles'

export const Notice = ({text, CloseButton, ActionButton, onBackgroundClick}) => {
    return (
        <ModalBackground onClick={e => {
            e.preventDefault()
            onBackgroundClick()
        }}>
            <Modal>
                {text}
                <ButtonContainer>
                    {ActionButton && <ActionButton />}
                    {CloseButton && <CloseButton />}
                </ButtonContainer>
            </Modal>
        </ModalBackground>
    )
}
