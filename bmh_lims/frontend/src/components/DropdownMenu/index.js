import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    DropdownMenu,
    DropdownButtonBackground,
    DropdownMenuItem,
    DropdownContainer,
    DropdownBar
} from './Styles'

const DropdownButton = ({theme, isDown }) => {
    return (
        <DropdownButtonBackground>
            {isDown ? <MdKeyboardArrowDown style={{fill: theme.colour4}}/> : <MdKeyboardArrowUp style={{fill: theme.colour4}}/>}
        </DropdownButtonBackground>
    )
}

const Dropdown = ({ theme, menuItems, initialValue, onItemClick}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [currentSelection, setCurrent] = useState(initialValue)
    return (
        <DropdownContainer >
            <DropdownBar onClick={(e) => { setMenuIsOpen(!menuIsOpen) }}>
                {currentSelection}
                <DropdownButton
                theme={theme}
                isDown={!menuIsOpen} />
            </DropdownBar>
            <DropdownMenu isOpen={menuIsOpen}>
                {menuItems.map((item, idx) => (
                <DropdownMenuItem
                key={`workflow-${idx}`}
                onClick={(e) => {
                    setCurrent(item)
                    onItemClick(item, idx)
                    setMenuIsOpen(!menuIsOpen)
                }}>
                    {item}
                </DropdownMenuItem>))}
            </DropdownMenu>
        </DropdownContainer>
    )
}

export default Dropdown
