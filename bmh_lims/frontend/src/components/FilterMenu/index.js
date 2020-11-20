import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FilterMenuContainer
} from './Styles'

import { theme } from '../../globalStyles'

import { DatePicker } from '@material-ui/pickers'
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const muiTheme = createMuiTheme({
    typography: {
        fontFamily: 'Quicksand'
    },
    overrides: {
        MuiFormControl: {
            root: {
                borderBottom: `1px solid ${theme.colour4}`,
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9rem',
                fontColor: theme.colour2,
                width: '100%',
                color: theme.colour3
            },
            input: {
                padding: 0,
                letterSpacing: 'normal',
                textAlign: 'center'
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: theme.colour2
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: theme.colour4
            }
        },
        MuiButton: {
            textPrimary: {
                color: theme.colour3
            }
        }
    }
})

const styles = {
    root: {
        fontColor: theme.colour2,
        width: '100%',
        padding: 0
    }
}

const StyledDatePicker = withStyles(styles)(({classes, active, ...props}) => (
    <DatePicker
    className={classes.root}
    InputProps={{
        disableUnderline: true,
        classes: {
            input: classes.root,
        }
    }}
    {...props} />
))

// import DatePicker from 'react-datepicker';

// import "react-datepicker/dist/react-datepicker.css"

const Filter = ({label, placeholder, value, onChangeHandler}) => {
    return (
        <FilterContainer>
            {label}
            <FreeTextFilter placeholder={placeholder} value={value} onChange={onChangeHandler} />
        </FilterContainer>
    )
}

const DateFilter = ({label, date, onChangeHandler}) => {
    const [active, setActive] = useState(false)
    return (
        <ThemeProvider theme={muiTheme}>
            <FilterContainer>
                {label}
                <StyledDatePicker
                value={date}
                active={active}
                onFocus={(e) => setActive(true)}
                onBlur={(e) => setActive(false)}
                onChange={date => onChangeHandler(date)} />
            </FilterContainer>
        </ThemeProvider>
    )
}

const FilterMenu = ({onUpdateHandler, theme}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(new Date())
    const [beforeDate, setBeforeDate] = useState(new Date())
    const [sampleName, setName] = useState('')
    const [projectID, setProjectID] = useState('')
    const [lab, setLab] = useState('')
    const [genus, setGenus] = useState('')
    const [sampleType, setSampleType] = useState('')
    return (
            <FilterMenuContainer open={isOpen}>
                <FilterHeader onClick={(e) => {setIsOpen(!isOpen)}}>
                    Filters
                    {isOpen ?
                    <MdKeyboardArrowUp style={{fill: theme.colour2, verticalAlign: 'middle'}}/>:
                    <MdKeyboardArrowDown style={{fill: theme.colour2, verticalAlign: 'middle'}}/>
                    }
                </FilterHeader>
                <FilterRow>
                    <Filter
                    label='Name'
                    placeholder='sample name'
                    value={sampleName}
                    onChangeHandler={(e) => {
                        setName(e.target.value)
                    }}/>
                    <Filter
                        label='Project ID'
                        placeholder='project ID'
                        value={projectID}
                        onChangeHandler={(e) => {
                            setProjectID(e.target.value)
                    }}/>
                    <DateFilter
                        label='Created After'
                        date={afterDate}
                        onChangeHandler={(date) => {
                            setAfterDate(date)
                    }}/>
                    <DateFilter
                    label='Created Before'
                    date={beforeDate}
                    onChangeHandler={(date) => {
                        setBeforeDate(date)
                    }}/>
                </FilterRow>
                <FilterRow>
                    <Filter
                    label='Lab'
                    placeholder='lab name'
                    value={lab}
                    onChangeHandler={(e) => {
                        setLab(e.target.value)
                    }}/>
                    <Filter
                    label='Genus'
                    placeholder='sample genus'
                    value={genus}
                    onChangeHandler={(e) => {
                        setGenus(e.target.value)
                    }}/>
                    <Filter
                    label='Type'
                    placeholder='sample type'
                    value={sampleType}
                    onChangeHandler={(e) => {
                        setSampleType(e.target.value)
                    }}/>
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu
