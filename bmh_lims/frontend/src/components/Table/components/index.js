import React, { useState, useCallback } from 'react'
import {
    BodySeparator,
    Content,
    HeaderSeparator,
} from '../Styles'

import {
    ColumnContainer,
    ColumnTable,
    ColumnRow,
    CheckboxHeaderContent,
    CheckboxBodyCell,
    CheckboxContent,
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
                        <CheckboxHeaderContent header={true} width={30}>
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
                                <CheckboxContent>
                                    <Checkbox
                                    checked={selected[rowNum]}
                                    onChangeHandler={(e) => {
                                        onSelect(rowNum)
                                        selected[rowNum] = !selected[rowNum]
                                        updateSelected([...selected])
                                    }}
                                    colour={colour}/>
                                </CheckboxContent>
                            </CheckboxBodyCell>
                        </ColumnRow>
                    ))
                }
            </BodySeparator>
        </ColumnTable>
    )
}

export { CheckboxColumn }
