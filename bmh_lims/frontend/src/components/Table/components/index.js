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

const CheckboxColumn = ({onSelectHandler, numRows, selectedRows}) => {
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
                                containerWidth={'100%'}
                                checked={selectedRows.has(rowNum)}
                                onChangeHandler={(e) => {
                                    onSelectHandler(e, rowNum)
                                }} />
                            </CheckboxBodyCell>
                        </ColumnRow>
                    ))
                }
            </BodySeparator>
        </ColumnTable>
    )
}

export { CheckboxColumn }
