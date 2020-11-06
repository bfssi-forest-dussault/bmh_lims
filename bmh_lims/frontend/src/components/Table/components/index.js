import React, { useCallback } from 'react'
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

const CheckboxColumn = ({colour, selected, updateSelected, numRows}) => {
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
                                    onChangeHandler={updateSelected(rowNum)}
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
