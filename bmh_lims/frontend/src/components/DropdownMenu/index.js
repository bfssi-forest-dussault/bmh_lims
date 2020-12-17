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

const Dropdown = ({ theme, menuItems, currentSelection, onItemClick, width}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    return (
        <DropdownContainer width={width}>
            <DropdownBar onClick={(e) => { setMenuIsOpen(!menuIsOpen) }} active={menuIsOpen}>
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
                    onItemClick(idx)
                    setMenuIsOpen(!menuIsOpen)
                }}>
                    {item}
                </DropdownMenuItem>))}
            </DropdownMenu>
        </DropdownContainer>
    )
}

export default Dropdown
export { UnderlineDropdown } from './UnderlineDropdown'
