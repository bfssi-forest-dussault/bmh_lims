import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FilterMenuContainer,
    StyledDatePicker
} from './Styles'

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
            onChange={date => onChangeHandler(date)}
            onBlur={onBlurHandler} />
        </FilterContainer>
    )
}

const FilterMenu = ({ onUpdateHandler, theme }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(new Date())
    const [beforeDate, setBeforeDate] = useState(new Date())
    const [sampleName, setName] = useState({match: '', isExact: true})
    const [projectName, setProjectID] = useState({match: '', isExact: true})
    const [lab, setLab] = useState({match: '', isExact: true})
    const [genus, setGenus] = useState({match: '', isExact: true})
    const [sampleType, setSampleType] = useState({match: '', isExact: true})

    const isExact = (value) => value.split('"').length > 1

    return (
            <FilterMenuContainer open={isOpen}>
                <FilterHeader onClick={(e) => {
                    setIsOpen(!isOpen)
                }}>
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
                    value={sampleName.match}
                    onChangeHandler={(e) => {
                        const newValue = e.target.value
                        setName({match: newValue, isExact: isExact(newValue)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
                    }} />
                    <Filter
                        label='Project ID'
                        placeholder='project ID'
                        value={projectName.match}
                        onChangeHandler={(e) => {
                            const newProject = e.target.value
                            setProjectID({match: newProject, isExact: isExact(newProject)})
                        }}
                        onBlurHandler={(e) => {
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
                        }}
                    />
                    <DateFilter
                        theme={theme}
                        label='Created Before'
                        date={beforeDate}
                        onChangeHandler={(date) => {
                            setBeforeDate(date)
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
                    }}/>
                    <DateFilter
                        theme={theme}
                        label='Created After'
                        date={afterDate}
                        onChangeHandler={(date) => {
                            setAfterDate(date)
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
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
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
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
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
                    }}
                    />
                    <Filter
                    label='Type'
                    placeholder='sample type'
                    value={sampleType.match}
                    onChangeHandler={(e) => {
                        const newSampleType = e.target.value
                        setSampleType({match: newSampleType, isExact: isExact(newSampleType)})
                    }}
                    onBlurHandler={(e) => {
                        onUpdateHandler({ sampleName, projectName, lab, genus, sampleType, dateRange: [afterDate, beforeDate] })
                    }}/>
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu
