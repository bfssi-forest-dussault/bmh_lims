import React, { useState, useCallback } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    DropdownMenu,
    DropdownButtonBackground,
    DropdownMenuItem,
    DropdownContainer,
    DropdownBar
} from './Styles'

const DropdownButton = ({theme, isDown, onClickHandler}) => {
    return (
        <DropdownButtonBackground onClick={onClickHandler}>
            {isDown ? <MdKeyboardArrowDown style={{fill: theme.colour4}}/> : <MdKeyboardArrowUp style={{fill: theme.colour4}}/>}
        </DropdownButtonBackground>
    )
}

const Dropdown = ({ theme, menuItems, initialValue}) => {
    let newLeft = 0
    let newTop = 0

    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [currentSelection, setCurrent] = useState(initialValue)

    const dropdownBarRef = useCallback(node => {
        if(node !== null) {
            console.log(newLeft + node.getBoundingClientRect().left)
            newLeft += node.getBoundingClientRect().left
            newTop += node.getBoundingClientRect().bottom
            setLeft(newLeft)
            setTop(newTop)
        }
    }, [])
    const dropdownContainerRef = useCallback(node => {
        if(node !== null) {
            console.log(newLeft - node.getBoundingClientRect().left)
            newLeft -= node.getBoundingClientRect().left
            newTop -= node.getBoundingClientRect().top
            setLeft(newLeft)
            setTop(newTop)
        }
    }, [])
    return (
        <DropdownContainer ref={dropdownContainerRef}>
            <DropdownBar ref={dropdownBarRef}>
                {currentSelection}
                <DropdownButton
                theme={theme}
                isDown={!menuIsOpen}
                onClickHandler={(e) => {
                    setMenuIsOpen(!menuIsOpen)
                }} />
            </DropdownBar>
            {menuIsOpen && (
                <DropdownMenu left={left} top={top}>
                    {menuItems.map((item, idx) => (
                    <DropdownMenuItem
                    key={`workflow-${idx}`}
                    onClick={(e) => {
                        setCurrent(item)
                        setMenuIsOpen(!menuIsOpen)
                    }}>
                        {item}
                    </DropdownMenuItem>))}
                </DropdownMenu>
            )}
        </DropdownContainer>
    )
}

export default Dropdown
