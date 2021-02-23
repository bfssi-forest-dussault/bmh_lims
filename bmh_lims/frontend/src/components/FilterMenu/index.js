import React from 'react'
import {
    FilterContainer,
    FreeTextFilter,
    FreeTextFilterContainer,
    StyledDatePicker,
    DateRangeContainer,
    DateRangeFilterContainer,
    StyledClearButton
} from './Styles'
import { UnderlineDropdown } from 'components'
import { AiOutlineLine } from 'react-icons/ai'

export const Filter = ({ label, placeholder, filterValue, onChangeHandler, onBlurHandler, onClearHandler,onEnterKey }) => {
    return (
        <FilterContainer>
            {label}
            <FreeTextFilterContainer>
                <FreeTextFilter
                placeholder={placeholder}
                value={filterValue}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyPress={onEnterKey}/>
                <StyledClearButton onClick={onClearHandler} />
            </FreeTextFilterContainer>
        </FilterContainer>
    )
}

export const DropdownFilter = ({label, menuItems, placeholder, ...props}) => {
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

export const DateRangeFilter = ({
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

export {
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
