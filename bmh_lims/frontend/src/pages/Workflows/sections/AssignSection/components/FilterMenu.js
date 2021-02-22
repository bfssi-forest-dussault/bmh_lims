import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DateTime from 'luxon/src/datetime.js'
import { ClickAwayListener } from '@material-ui/core';
import {
    FilterHeader,
    FilterRow,
    FilterMenuContainer,
    StyledUpArrow,
    StyledDownArrow,
    Filter,
    DateRangeFilter,
    DropdownFilter
} from 'components'

const FilterMenu = ({ onUpdateHandler, theme, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(null)
    const [beforeDate, setBeforeDate] = useState(new Date())
    const [projectName, setProjectName] = useState({match: '', isExact: true})
    const [lab, setLab] = useState({match: '', isExact: true})
    const [genus, setGenus] = useState({match: '', isExact: true})
    const [sampleType, setSampleType] = useState({match: '', isExact: true})
    const [shouldOverflow, setShouldOverflow] = useState(false)
    const [sampleName, setSampleName] = useState({match: '', isExact: false})
    const [allLabNames, setAllLabNames] = useState([])

    const isExact = (value) => value.split('"').length === 3

    const sanitizedFilter = ({match, isExact}) => {
        if (isExact) {
            return {match: match.split('"')[1], isExact}
        }
        return filter
    }

    const toLuxon = (date) => {
        if (!!date && !date.isLuxonDateTime) {
            return DateTime.fromJSDate(date)
        }
        return date
    }

    useEffect(() => {
        const initializeLabNames = async () => {
            const labs = (await axios.get('/api/labs')).data
            const labNames = labs.map(lab => lab.lab_name)
            setAllLabNames(labNames)
        }
        initializeLabNames()
    }, [])

    // types of operations: sanitize, set
    const runUpdateHandler = (filterName, operation, newFilterValue=null) => {
        const updateFilter = {sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]}}
        if (operation === 'sanitize') {
            updateFilter[filterName] = sanitizedFilter(updateFilter[filterName])
            onUpdateHandler(updateFilter)
        }
        if (operation === 'set') {
            updateFilter[filterName] = newFilterValue
            onUpdateHandler(updateFilter)
        }
    }

    const handleClickAway = () => {
        setIsOpen(false);
        setShouldOverflow(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <FilterMenuContainer open={isOpen} shouldOverflow={shouldOverflow}>
                <FilterHeader onClick={(e) => {
                    if (isOpen) {
                        setShouldOverflow(false)
                    }
                    setIsOpen(!isOpen)
                }}>
                    Filters
                    { isOpen ? <StyledUpArrow /> : <StyledDownArrow /> }
                </FilterHeader>
                <FilterRow>
                    <Filter
                    label='Sample Name'
                    placeholder='Sample Name'
                    filterValue={sampleName.match}
                    onChangeHandler={(e) => {
                        setSampleName({match: e.target.value, isExact: isExact(e.target.value)})
                    }}
                    onBlurHandler={(e) => {
                        runUpdateHandler('sampleName', 'sanitize')
                    }}
                    onClearHandler={(e) => {
                        setSampleName({match: '', isExact: false})
                        runUpdateHandler('sampleName', 'set', {match: '', isExact: false})
                    }} />
                    <Filter
                        label='Project Name'
                        placeholder='Project Name'
                        filterValue={projectName.match}
                        onChangeHandler={(e) => {
                            const newProject = e.target.value
                            setProjectName({match: newProject, isExact: isExact(newProject)})
                        }}
                        onBlurHandler={(e) => {
                            runUpdateHandler('projectName', 'sanitize')
                        }}
                        onClearHandler={(e) => {
                            setProjectName({match: '', isExact: true})
                            runUpdateHandler('projectName', 'set', {match: '', isExact: false})
                        }}
                    />
                    <DateRangeFilter
                        theme={theme}
                        label={'Date submitted'}
                        placeholders={['Uploaded After', 'Uploaded before']}
                        initialDates={[afterDate, beforeDate]}
                        onChangeHandler={(dateRange) => {
                            setAfterDate(dateRange[0])
                            setBeforeDate(dateRange[1])
                            runUpdateHandler('dateRange', 'set', {match: [toLuxon(dateRange[0]), toLuxon(dateRange[1])]})
                        }}
                        lowerBound={afterDate}
                        upperBound={beforeDate}
                        maxDate={maxDate || new Date()}
                    />
                </FilterRow>
                <FilterRow>
                    <DropdownFilter
                        label='Lab'
                        menuItems={allLabNames || []}
                        placeholder={'Select Lab'}
                        onExpandHandler={() => {
                            setShouldOverflow(true)
                        }}
                        onChangeHandler={(newValue) => {
                            setLab({ match: newValue, isExact: true })
                            runUpdateHandler('lab', 'set', { match: newValue, isExact: true })
                        }}
                        currentValue={lab.match}
                    />
                    <Filter
                    label='Genus'
                    placeholder='Sample Genus'
                    filterValue={genus.match}
                    onChangeHandler={(e) => {
                        const newGenus = sanitizedFilter(e.target.value)
                        setGenus({match: newGenus, isExact: isExact(newGenus)})
                    }}
                    onBlurHandler={(e) => {
                        runUpdateHandler('genus', 'sanitize')
                    }}
                    onClearHandler={(e) => {
                        setGenus({ match: '', isExact: true })
                        runUpdateHandler('genus', 'set', { match: '', isExact: false })
                    }}
                    />
                    <DropdownFilter
                        label='Sample Type'
                        menuItems={['sampleType 1', 'sampleType 2', 'sampleType3']}
                        placeholder={'select type'}
                        currentValue={sampleType.match}
                        onExpandHandler={() => {
                            setShouldOverflow(true)
                        }}
                        onChangeHandler={(newValue) => {
                            setSampleType({ match: newValue, isExact: true })
                            runUpdateHandler('sampleType', 'set', { match: newValue, isExact: true })
                        }}
                    />
                </FilterRow>
            </FilterMenuContainer>
        </ClickAwayListener>
    )
}

export default FilterMenu
