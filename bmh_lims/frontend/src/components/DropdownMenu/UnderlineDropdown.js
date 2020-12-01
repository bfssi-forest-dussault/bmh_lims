import React, { useState } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

export const StyledUpArrow = styled(MdKeyboardArrowUp)`
    fill: ${props => props.theme.colour2};
    vertical-align: middle;
`

export const StyledDownArrow = styled(MdKeyboardArrowDown)`
    fill: ${props => props.theme.colour2};
    vertical-align: middle;
`

export const DropdownField = styled.div`
    width: 100%;
    color: ${props => props.hasValue ? props.theme.colour3 : 'rgba(100, 100, 100, 0.6)'};
    border: none;
    border-bottom: 1px solid ${props => props.theme.colour4};
    background-color: white;
    &:focus {
        border-bottom: 1px solid ${props => props.theme.colour5};
    }
    text-align: center;
`

export const DropdownMenu = styled.div`
    width: 100%;
    max-height: ${props => props.isOpen ? '100px' : '0px'};
    overflow: hidden;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 1;
    transition: max-height 1s;
`

export const DropdownInternalMenu = styled.div`
    width: 100%;
    max-height: 100px;
    overflow-y: auto;
`

export const DropdownMenuItem = styled.div`
    color: ${props => props.theme.colour4};
    background-color: white;
    border: solid 1px ${props => props.theme.colour4};
    &:hover {
        color: white;
        background-color: ${props => props.theme.colour4};
    }
`

export const DropdownButtonContainer = styled.div`
    float: right;
    vertical-align: middle;
`

export const DropdownFieldContainer = styled.div`
    width: 100%;
    position: relative;
`

export const DropdownButton = ({isOpen}) => {
    return isOpen ? <StyledUpArrow /> : <StyledDownArrow />
}

export const UnderlineDropdown = ({ menuItems, placeholder, onExpandHandler }) => {
    const [open, setOpen] = useState(false)
    const [curVal, setCurVal] = useState('')
    return (
        <DropdownFieldContainer
            onClick={(e) => {
                onExpandHandler()
                setOpen(!open)
            }}>
            <DropdownField hasValue={!!curVal}>
                {!!curVal ? curVal : placeholder}
                <DropdownButtonContainer>
                    <DropdownButton isOpen={open} />
                </DropdownButtonContainer>
            </DropdownField>
            <DropdownMenu isOpen={open}>
                <DropdownInternalMenu>
                    {menuItems.map((menuItem, idx) => (
                    <DropdownMenuItem onClick={(e) => {setCurVal(menuItem)}} key={`dropdown-${menuItem}-${idx}`}>
                        {menuItem}
                    </DropdownMenuItem>
                    ))}
                </DropdownInternalMenu>
            </DropdownMenu>
        </DropdownFieldContainer>
    )
}
