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

const FilterMenu = ({dateRange, name, projectID, lab, genus, type, theme}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [afterDate, setAfterDate] = useState(new Date())
    const [beforeDate, setBeforeDate] = useState(new Date())
    const [sampleName, setName] = useState('')
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
                    value={''}
                    onChangeHandler={(e) => {
                        console.log(e.target.value)
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
                value={''}
                onChangeHandler={(e) => {
                    console.log(e.target.value)
                }}/>
                <Filter
                label='Genus'
                value={''}
                onChangeHandler={(e) => {
                    console.log(e.target.value)
                }}/>
                <Filter
                label='Type'
                value={''}
                onChangeHandler={(e) => {
                    console.log(e.target.value)
                }}/>
            </FilterRow>
        </FilterMenuContainer>
    )
}

export default FilterMenu
