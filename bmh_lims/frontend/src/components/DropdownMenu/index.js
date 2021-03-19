import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    DropdownMenu,
    DropdownButtonBackground,
    DropdownMenuItem,
    DropdownContainer,
    DropdownBar
} from './Styles'
import { ClickAwayListener } from '@material-ui/core';

const DropdownButton = ({theme, isDown }) => {
    return (
        <DropdownButtonBackground>
            {isDown ? <MdKeyboardArrowDown style={{fill: theme.secondarybg, height:'1.3em', width:'1.3em'}}/> : <MdKeyboardArrowUp style={{fill: theme.secondarybg, height:'1.3em', width:'1.3em'}}/>}
        </DropdownButtonBackground>
    )
}

const Dropdown = ({ theme, menuItems, currentSelection, onItemClick, width}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const handleClickAway = () => {
        setMenuIsOpen(false);

    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <DropdownContainer width={width}>
                <DropdownBar onClick={(e) => { setMenuIsOpen(!menuIsOpen) }} active={menuIsOpen}>
                    <p>{currentSelection}</p>
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
        </ClickAwayListener>
    )
}

export default Dropdown
export { UnderlineDropdown } from './UnderlineDropdown'
