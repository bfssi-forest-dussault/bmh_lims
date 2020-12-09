import React from 'react'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri'

export const Checkbox = ({checked, onChangeHandler, colour}) => {
    return (
        <div onClick={(e) => {onChangeHandler(e)}}>
            {checked ? 
            <RiCheckboxCircleFill style={{
                fill: colour,
                verticalAlign: 'middle'
            }}/> : 
            <RiCheckboxBlankCircleLine style={{
                fill: colour,
                verticalAlign: 'middle'
            }}/>}
        </div>
    )
}
