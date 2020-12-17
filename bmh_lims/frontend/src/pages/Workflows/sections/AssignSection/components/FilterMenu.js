import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DateTime from 'luxon/src/datetime.js'
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

    const isExact = (value) => value.split('"').length > 1

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
                        onUpdateHandler({ sampleName: {match: '', isExact: true}, projectName, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                            onUpdateHandler({ sampleName, projectName: {match: '', isExact: true}, lab, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                        maxDate={maxDate || new Date()}
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
                            onUpdateHandler({ sampleName, projectName, lab: { match: newValue, isExact: true }, genus, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                        onUpdateHandler({ sampleName, projectName, lab, genus: {match: '', isExact: true}, sampleType, dateRange: {match: [afterDate, beforeDate]} })
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
                            onUpdateHandler({ sampleName, projectName, lab, genus, sampleType: { match: newValue, isExact: true }, dateRange: {match: [afterDate, beforeDate]} })
                        }}
                    />
                </FilterRow>
            </FilterMenuContainer>
    )
}

export default FilterMenu