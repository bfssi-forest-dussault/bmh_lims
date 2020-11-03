import React from 'react'
import { CheckboxContainer } from './Styles'
import { IconContext } from 'react-icons'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri'

export const Checkbox = ({checked, onChangeHandler}) => {
    return (
    <IconContext.Provider value={{ color: 'rgb(0, 180, 200)'}}>
        <CheckboxContainer onClick={(e) => {console.log('clicked'); onChangeHandler(e)}}>
            {checked ? <RiCheckboxCircleFill/> : <RiCheckboxBlankCircleLine />}
        </CheckboxContainer>
    </IconContext.Provider>
    )
}
