import React from 'react'
import styled from 'styled-components'

import { DatePicker } from '@material-ui/pickers'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { IoIosCloseCircle } from 'react-icons/io'

const muiTheme = ({ theme }) => createMuiTheme({
    typography: {
        fontFamily: 'inherit',
    },
    overrides: {
        MuiInputBase: {
            root: {
                width: '100%',
                padding: 0,
                color: theme.colour3,
                fontWeight: 900
            },
            input: {
                padding: 0,
                letterSpacing: 'normal',
                textAlign: 'center',
                borderBottom: `1px solid ${theme.colour4}`,
                '&&&:focus': {
                    borderBottom: `1px solid ${theme.colour5}`
                },
                '&::placeholder': {
                    color: 'rgb(100, 100, 100)'
                }
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: theme.colour2
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: theme.colour4,
                '&&&:hover': {
                    backgroundColor: theme.colour5
                }
            }
        },
        MuiButton: {
            textPrimary: {
                color: theme.colour3
            }
        }
    }
})

export const StyledClearButton = styled(IoIosCloseCircle)`
    fill: ${props => props.theme.colour3};
    display: none;
    position: absolute;
    vertical-align: middle;
    right: 0;
    cursor: pointer;
`

const DatePickerContainer = styled.div`
    position: relative;
    width: 100%;
    &:hover ${StyledClearButton} {
        display: inline-block;
    }
`

export const StyledDatePicker = ({ theme, onClearHandler, ...props }) => (
    <ThemeProvider theme={muiTheme({ theme })}>
        <DatePickerContainer>
            <DatePicker
            views={['date', 'year']}
            format='DD'
            InputProps={{
                disableUnderline: true
            }}
            {...props} />
            <StyledClearButton onClick={onClearHandler} />
        </DatePickerContainer>
    </ThemeProvider>
)

export const StyledUpArrow = styled(MdKeyboardArrowUp)`
    fill: ${props => props.theme.colour2};
    vertical-align: middle;
`

export const StyledDownArrow = styled(MdKeyboardArrowDown)`
    fill: ${props => props.theme.colour2};
    vertical-align: middle;
`

export const FilterHeader = styled.div`
    width: 100%;
    display: inline-block;
    height: 2rem;
    color: ${props => props.theme.colour2};
    font-size: 1.3rem;
    font-weight: bold;
`

export const FilterRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 2%;
`

export const FilterContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.colour2};
`

export const FreeTextFilterContainer = styled.div`
    width: 100%;
    position: relative;
    height: 20px;
    color: ${props => props.theme.colour3};
    border-bottom: 1px solid ${props => props.theme.colour4};
    &:focus-within {
        border-bottom: 1px solid ${props => props.theme.colour5};
    }
    &:hover ${StyledClearButton} {
        display: block;
    }
    background-color: white;
`

export const FreeTextFilter = styled.input.attrs(props => ({
    type: 'text'
}))`
    width: 100%;
    color: ${props => props.theme.colour3};
    border: none;
    position: absolute;
    ::placeholder {
        color: rgb(100, 100, 100);
    }
    text-align: center;
`

export const FilterMenuContainer = styled.div`
    width: 100%;
    max-height: ${props => props.open ? '10em': '2rem'};
    overflow: ${props => props.shouldOverflow ? 'visible' : 'hidden'};
    transition: max-height 1s;
    border-bottom: 1px solid ${props => props.theme.colour1};
`

export const DateRangeFilterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const DateRangeContainer = styled.div`
    color: ${props => props.theme.colour2};
    width: 40%;
    text-align: center;
`
