import React from 'react'
import { CheckboxContainer, CheckedBox, UncheckedBox } from './Styles'

export const Checkbox = ({checked, onChangeHandler, containerWidth}) => {
    return (
        <CheckboxContainer width={containerWidth} onClick={onChangeHandler}>
            {checked ? <CheckedBox /> : <UncheckedBox />}
        </CheckboxContainer>
    )
}
