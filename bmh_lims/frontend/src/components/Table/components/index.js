import React, { useState, useCallback } from 'react'
import {
    BodySeparator,
    Content,
    HeaderSeparator,
} from '../Styles'

import {
    ColumnTable,
    ColumnRow,
    CheckboxHeaderContent,
    CheckboxBodyCell,
    CheckboxHeaderCell
} from './Styles'

import { Checkbox } from 'components'

export const MappedCell = ({updateColWidths, ...props}) => {
    const measuredRef = useCallback(node => {
        if (node !== null) {
            updateColWidths(node.getBoundingClientRect().width)
        }
    }, [])
    return (
    <Content {...props} ref={measuredRef}>
        {props.children}
    </Content>
    )
}

const CheckboxColumn = ({colour, onSelect, numRows}) => {
    const [selected, updateSelected] = useState([...Array(numRows).keys()].map(idx => false))
    return (
        <ColumnTable>
            <HeaderSeparator>
                <ColumnRow>
                    <CheckboxHeaderCell width={30}>
                        <CheckboxHeaderContent>
                            selected
                        </CheckboxHeaderContent>
                    </CheckboxHeaderCell>
                </ColumnRow>
            </HeaderSeparator>
            <BodySeparator>
                {
                    [...Array(numRows).keys()].map(rowNum => (
                        <ColumnRow key={`checkbox-${rowNum}`}>
                            <CheckboxBodyCell>
                                <Checkbox
                                checked={selected[rowNum]}
                                onChangeHandler={(e) => {
                                    onSelect(rowNum)
                                    selected[rowNum] = !selected[rowNum]
                                    updateSelected([...selected])
                                }}
                                colour={colour}/>
                            </CheckboxBodyCell>
                        </ColumnRow>
                    ))
                }
            </BodySeparator>
        </ColumnTable>
    )
}

export { CheckboxColumn }
