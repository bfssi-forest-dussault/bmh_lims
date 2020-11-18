import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {
    FilterHeader,
    FilterRow,
    FilterContainer,
    FreeTextFilter,
    FilterMenuContainer
} from './Styles'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css"

const Filter = ({label, placeholder, value, onChangeHandler}) => {
    return (
        <FilterContainer>
            {label}
            <FreeTextFilter placeholder={placeholder} value={value} onChange={onChangeHandler} />
        </FilterContainer>
    )
}

const DateFilter = ({label, date, onChangeHandler}) => {
    return (
        <FilterContainer>
            {label}
            <DatePicker
            selected={date}
            onChange={date => onChangeHandler(date)}
            customInput={<FreeTextFilter />} />
        </FilterContainer>
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
                value={lab}
                onChangeHandler={(e) => {
                    setLab(e.target.value)
                }}/>
                <Filter
                label='Genus'
                value={genus}
                onChangeHandler={(e) => {
                    setGenus(e.target.value)
                }}/>
                <Filter
                label='Type'
                value={sampleType}
                onChangeHandler={(e) => {
                    setSampleType(e.target.value)
                }}/>
            </FilterRow>
        </FilterMenuContainer>
    )
}

export default FilterMenu
