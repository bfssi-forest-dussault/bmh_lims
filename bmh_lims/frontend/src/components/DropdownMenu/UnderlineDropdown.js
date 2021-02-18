import React, { useState } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { ClickAwayListener } from '@material-ui/core';

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
    border-bottom: 1px solid ${props => props.isOpen ? props.theme.colour5 : props.theme.colour4};
    background-color: white;
    text-align: center;
`

export const DropdownMenu = styled.div`
    width: 100%;
    max-height: ${props => props.isOpen ? '87px' : '0px'};
    overflow: hidden;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 1;
    transition: max-height 0.7s;
`

export const DropdownInternalMenu = styled.div`
    width: 100%;
    max-height: 87px;
    overflow-y: auto;
`

export const DropdownMenuItem = styled.div`
    color: ${props => props.theme.colour4};
    background-color: white;
    border: solid 1px ${props => props.theme.colour4};
    padding-left: 3%;
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
  margin-top: 2px;
  font-size: 15px;
`

export const DropdownButton = ({isOpen}) => {
    return isOpen ? <StyledUpArrow /> : <StyledDownArrow />
}

export const UnderlineDropdown = ({ menuItems, currentValue, placeholder, onExpandHandler, onChangeHandler }) => {
    const [open, setOpen] = useState(false);
    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <DropdownFieldContainer
                onClick={(e) => {
                    onExpandHandler()
                    setOpen(!open)
                }}>
                <DropdownField isOpen={open} hasValue={!!currentValue}>
                    {!!currentValue ? currentValue : placeholder}
                    <DropdownButtonContainer>
                        <DropdownButton isOpen={open} />
                    </DropdownButtonContainer>
                </DropdownField>
                <DropdownMenu isOpen={open}>
                    <DropdownInternalMenu>
                        {['Clear filter', ...menuItems].map((menuItem, idx) => (
                        <DropdownMenuItem onClick={(e) => {
                            if (menuItem === 'Clear filter') {
                                onChangeHandler('')
                            } else {
                                onChangeHandler(menuItem)
                            }
                        }} key={`dropdown-${menuItem}-${idx}`}>
                            {menuItem}
                        </DropdownMenuItem>
                        ))}
                    </DropdownInternalMenu>
                </DropdownMenu>
            </DropdownFieldContainer>
        </ClickAwayListener>
    )
}
