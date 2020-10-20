import React from 'react'
import { ModalBackground, Modal, ButtonContainer, InfoContainer} from './Styles'
import { MultilineText } from 'components'

export const Notice = ({text, CloseButton, ActionButton, onBackgroundClick, info}) => {
    return (
        <ModalBackground onClick={e => {
            e.preventDefault()
            onBackgroundClick()
        }}>
            <Modal>
                {text}
                {info && (
                <InfoContainer>
                        <MultilineText text={info} />
                </InfoContainer>)}
                <ButtonContainer>
                    {ActionButton && <ActionButton />}
                    {CloseButton && <CloseButton />}
                </ButtonContainer>
            </Modal>
        </ModalBackground>
    )
}
