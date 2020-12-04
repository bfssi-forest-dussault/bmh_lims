import React, { useState, useEffect } from 'react'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FilterMenuContainer,
    StyledDatePicker,
    StyledUpArrow,
    StyledDownArrow,
    DateRangeContainer,
    DateRangeFilterContainer
} from './Styles'
import { UnderlineDropdown } from 'components' 
import { AiOutlineLine } from 'react-icons/ai'
import DateTime from 'luxon/src/datetime.js'
import axios from 'axios'

const Filter = ({ label, placeholder, value, onChangeHandler, onBlurHandler }) => {
    return (
        <FilterContainer>
            {label}
            <FreeTextFilter
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler} />
        </FilterContainer>
    )
}

const DropdownFilter = ({label, menuItems, placeholder, ...props}) => {
    return (
        <FilterContainer>
            {label}
            <UnderlineDropdown 
                menuItems={menuItems}
                placeholder={placeholder}
                {...props}
            />
        </FilterContainer>
    )
}

const DateRangeFilter = ({
        placeholders,
        label,
        initialDates,
        onChangeHandler,
        theme,
        maxDate
    }) => {
    const [lowerBound, setLowerBound] = useState(initialDates[0])
    const [upperBound, setUpperBound] = useState(initialDates[1] || maxDate || new Date())

    const toLuxon = (date) => {
        if (!!date && !date.isLuxonDateTime) {
            return DateTime.fromJSDate(date)
        }
        return date
    }

    return (
        <DateRangeContainer>
            {label}
            <DateRangeFilterContainer>
                <StyledDatePicker
                    theme={theme}
                    value={lowerBound}
                    placeholder={placeholders[0]}
                    maxDate={maxDate}
                    onChange={date => {
                        setLowerBound(date)
                        onChangeHandler([date, toLuxon(upperBound)])
                    }} />
                <AiOutlineLine style={{stroke: theme.colour2}}/>
                <StyledDatePicker
                    theme={theme}
                    value={upperBound}
                    placeholder={placeholders[1]}
                    maxDate={maxDate || upperBound}
                    onChange={date => {
                        setUpperBound(date)
                        onChangeHandler([toLuxon(lowerBound), date])
                    }} />
            </DateRangeFilterContainer>
        </DateRangeContainer>
    )
}

const FilterMenu = ({ onUpdateHandler, theme, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(null)
    const [beforeDate, setBeforeDate] = useState(null)
    const [sampleName, setName] = useState({match: '', isExact: true})
    const [projectName, setProjectID] = useState({match: '', isExact: true})
    const [lab, setLab] = useState({match: '', isExact: true})
    const [genus, setGenus] = useState({match: '', isExact: true})
    const [sampleType, setSampleType] = useState({match: '', isExact: true})
    const [shouldOverflow, setShouldOverflow] = useState(false)
    const [allLabNames, setAllLabNames] = useState(null)

    const isExact = (value) => value.split('"').length > 1

    useEffect(() => {
        const initializeLabNames = async () => {
            const labs = (await axios.get('/api/labs')).data
            const labNames = labs.map(lab => lab.lab_name)
            setAllLabNames(labNames)
        }
        initializeLabNames()
    }, [])

    return (
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
                    label='Name'
                    placeholder='sample name'
                    value={sampleName.match}
                    onChangeHandler={(e) => {
                        const newValue = e.target.value
                        setName({match: newValue, isExact: isExact(newValue)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }} />
                    <Filter
                        label='Project Name'
                        placeholder='project name'
                        value={projectName.match}
                        onChangeHandler={(e) => {
                            const newProject = e.target.value
                            setProjectID({match: newProject, isExact: isExact(newProject)})
                        }}
                        onBlurHandler={(e) => {
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                        }}
                    />
                    <DateRangeFilter
                        theme={theme}
                        label={'Date uploaded'}
                        placeholders={['Uploaded after', 'Uploaded before']}
                        initialDates={[null, null]}
                        onChangeHandler={(dateRange) => {
                            setAfterDate(dateRange[0])
                            setBeforeDate(dateRange[1])
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [dateRange[0], dateRange[1]]} })
                        }}
                        maxDate={maxDate}
                    />
                </FilterRow>
                <FilterRow>
                    <DropdownFilter
                        label='Lab'
                        menuItems={allLabNames || []}
                        placeholder={'select lab'}
                        onExpandHandler={() => {
                            setShouldOverflow(true)
                        }}
                        onChangeHandler={(newValue) => {
                            setLab(newValue)
                        }}
                    />
                    <Filter
                    label='Genus'
                    placeholder='sample genus'
                    value={genus.match}
                    onChangeHandler={(e) => {
                        const newGenus = e.target.value
                        setGenus({match: newGenus, isExact: isExact(newGenus)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }}
                    />
                    <DropdownFilter
                        label='Sample Type'
                        menuItems={['sampleType 1', 'sampleType 2', 'sampleType3']}
                        placeholder={'select sample type'}
                        onExpandHandler={() => {
                            setShouldOverflow(true)
                        }}
                        onChangeHandler={(newValue) => {
                            setSampleType(newValue)
                        }}
                    />
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu
