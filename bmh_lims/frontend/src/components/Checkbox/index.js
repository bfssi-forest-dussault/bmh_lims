import React from 'react'
import { CheckboxContainer } from './Styles'
import { IconContext } from 'react-icons'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri'

export const Checkbox = ({checked, onChangeHandler, colour}) => {
    return (
    <IconContext.Provider value={{ color: 'rgb(0, 180, 200)'}}>
        <CheckboxContainer onClick={(e) => {onChangeHandler(e)}}>
            {checked ? <RiCheckboxCircleFill style={{fill: colour || 'black'}}/> : <RiCheckboxBlankCircleLine style={{fill: colour || 'black'}}/>}
        </CheckboxContainer>
    </IconContext.Provider>
    )
}
