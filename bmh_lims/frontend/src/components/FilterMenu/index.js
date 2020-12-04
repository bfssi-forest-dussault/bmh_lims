import React, { useState } from 'react'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FilterMenuContainer,
    StyledDatePicker,
    StyledUpArrow,
    StyledDownArrow
} from './Styles'
import { UnderlineDropdown } from 'components' 
import styled from 'styled-components'
import { AiOutlineLine } from 'react-icons/ai'

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

const DateRangeFilterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const DateRangeContainer = styled.div`
    color: ${props => props.theme.colour2};
    width: 40%;
    text-align: center;
`

const DateRangeFilter = ({placeholders, label, initialDates, onChangeHandler, theme, onBlurHandler}) => {
    const [lowerBound, setLowerBound] = useState(initialDates[0])
    const [upperBound, setUpperBound] = useState(initialDates[1])
    return (
        <DateRangeContainer>
            {label}
            <DateRangeFilterContainer>
                <StyledDatePicker
                    theme={theme}
                    value={lowerBound}
                    placeholder={placeholders[0]}
                    onChange={date => {
                        setLowerBound(date)
                        onChangeHandler([date, upperBound])
                    }}
                    onClose={onBlurHandler} />
                <AiOutlineLine style={{stroke: theme.colour2}}/>
                <StyledDatePicker
                    theme={theme}
                    value={upperBound}
                    placeholder={placeholders[1]}
                    onChange={date => {
                        setUpperBound(date)
                        onChangeHandler([lowerBound, date])
                    }}
                    onClose={onBlurHandler} />
            </DateRangeFilterContainer>
        </DateRangeContainer>
    )
}

const FilterMenu = ({ onUpdateHandler, theme }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(null)
    const [beforeDate, setBeforeDate] = useState(null)
    const [sampleName, setName] = useState({match: '', isExact: true})
    const [projectName, setProjectID] = useState({match: '', isExact: true})
    const [lab, setLab] = useState({match: '', isExact: true})
    const [genus, setGenus] = useState({match: '', isExact: true})
    const [sampleType, setSampleType] = useState({match: '', isExact: true})
    const [shouldOverflow, setShouldOverflow] = useState(false)

    const isExact = (value) => value.split('"').length > 1

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
                        }}
                        onBlurHandler={(e) => {
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                        }}
                    />
                </FilterRow>
                <FilterRow>
                    <DropdownFilter
                        label='Lab'
                        menuItems={['lab 1', 'lab 2', 'lab 3']}
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
