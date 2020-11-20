import React from 'react'
import { CheckboxContainer } from './Styles'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri'

export const Checkbox = ({checked, onChangeHandler, colour}) => {
    return (
        <CheckboxContainer onClick={(e) => {onChangeHandler(e)}}>
            {checked ? 
            <RiCheckboxCircleFill style={{
                fill: colour,
                verticalAlign: 'middle'
            }}/> : 
            <RiCheckboxBlankCircleLine style={{
                fill: colour,
                verticalAlign: 'middle'
            }}/>}
        </CheckboxContainer>
    )
}
