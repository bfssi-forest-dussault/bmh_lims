import React, { useState } from 'react'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FreeTextFilterContainer,
    FilterMenuContainer,
    StyledDatePicker,
    StyledUpArrow,
    StyledDownArrow,
    DateRangeContainer,
    DateRangeFilterContainer,
    StyledClearButton
} from './Styles'
import { UnderlineDropdown } from 'components' 
import { AiOutlineLine } from 'react-icons/ai'
import DateTime from 'luxon/src/datetime.js'

const Filter = ({ label, placeholder, filterValue, onChangeHandler, onBlurHandler, onClearHandler }) => {
    return (
        <FilterContainer>
            {label}
            <FreeTextFilterContainer>
                <FreeTextFilter
                placeholder={placeholder}
                value={filterValue}
                onChange={onChangeHandler}
                onBlur={onBlurHandler} />
                <StyledClearButton onClick={onClearHandler} />
            </FreeTextFilterContainer>
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
        onChangeHandler,
        theme,
        maxDate,
        lowerBound,
        upperBound,
    }) => {

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
                        onChangeHandler([date, upperBound])
                    }}
                    onClearHandler={(e) => {
                        onChangeHandler([null, upperBound])
                    }} />
                <AiOutlineLine style={{stroke: theme.colour2}}/>
                <StyledDatePicker
                    theme={theme}
                    value={upperBound}
                    placeholder={placeholders[1]}
                    maxDate={maxDate || upperBound}
                    onChange={date => {
                        onChangeHandler([lowerBound, date])
                    }}
                    onClearHandler={(e) => {
                        onChangeHandler([lowerBound, null])
                    }} />
            </DateRangeFilterContainer>
        </DateRangeContainer>
    )
}

const FilterMenu = ({ onUpdateHandler, allLabNames, theme, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(null)
    const [beforeDate, setBeforeDate] = useState(new Date())
    const [projectName, setProjectName] = useState({match: '', isExact: true})
    const [lab, setLab] = useState({match: '', isExact: true})
    const [genus, setGenus] = useState({match: '', isExact: true})
    const [sampleType, setSampleType] = useState({match: '', isExact: true})
    const [shouldOverflow, setShouldOverflow] = useState(false)
    const [sampleName, setSampleName] = useState({match: '', isExact: false})

    const isExact = (value) => value.split('"').length > 1

    const toLuxon = (date) => {
        if (!!date && !date.isLuxonDateTime) {
            return DateTime.fromJSDate(date)
        }
        return date
    }

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
                    label='Sample name'
                    placeholder='sample name'
                    filterValue={sampleName.match}
                    onChangeHandler={(e) => {
                        setSampleName({match: e.target.value, isExact: isExact(e.target.value)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }}
                    onClearHandler={(e) => {
                        setSampleName({match: '', isExact: true})
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }} />
                    <Filter
                        label='Project Name'
                        placeholder='project name'
                        filterValue={projectName.match}
                        onChangeHandler={(e) => {
                            const newProject = e.target.value
                            setProjectName({match: newProject, isExact: isExact(newProject)})
                        }}
                        onBlurHandler={(e) => {
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                        }}
                        onClearHandler={(e) => {
                            setProjectName({match: '', isExact: true})
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                        }}
                    />
                    <DateRangeFilter
                        theme={theme}
                        label={'Date uploaded'}
                        placeholders={['Uploaded after', 'Uploaded before']}
                        initialDates={[afterDate, beforeDate]}
                        onChangeHandler={(dateRange) => {
                            setAfterDate(dateRange[0])
                            setBeforeDate(dateRange[1])
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [toLuxon(dateRange[0]), toLuxon(dateRange[1])]} })
                        }}
                        lowerBound={afterDate}
                        upperBound={beforeDate}
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
                            setLab({ match: newValue, isExact: true })
                        }}
                        currentValue={lab.match}
                    />
                    <Filter
                    label='Genus'
                    placeholder='sample genus'
                    filterValue={genus.match}
                    onChangeHandler={(e) => {
                        const newGenus = e.target.value
                        setGenus({match: newGenus, isExact: isExact(newGenus)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }}
                    onClearHandler={(e) => {
                        setGenus({ match: '', isExact: true })
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                        }}
                    />
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu
