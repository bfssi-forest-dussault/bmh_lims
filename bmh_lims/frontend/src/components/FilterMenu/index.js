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

const DateFilter = ({ theme, label, date, onChangeHandler, onBlurHandler }) => {
    return (
        <FilterContainer>
            {label}
            <StyledDatePicker
            theme={theme}
            value={date}
            placeholder={label}
            onChange={date => onChangeHandler(date)}
            onClose={onBlurHandler} />
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
                    <DateFilter
                        theme={theme}
                        label='Uploaded After'
                        date={afterDate}
                        onChangeHandler={(date) => {
                            setAfterDate(date)
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }}/>
                    <DateFilter
                        theme={theme}
                        label='Uploaded Before'
                        date={beforeDate}
                        onChangeHandler={(date) => {
                            setBeforeDate(date)
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
                    }}/>
                </FilterRow>
                <FilterRow>
                    <Filter
                    label='Lab'
                    placeholder='lab name'
                    value={lab.match}
                    onChangeHandler={(e) => {
                        const newLab = e.target.value
                        setLab({match: newLab, isExact: isExact(newLab)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                    />
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu
