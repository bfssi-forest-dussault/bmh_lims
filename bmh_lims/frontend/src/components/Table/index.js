import React, { useState } from 'react'
import {
    BodyCell,
    BodyContent,
    BodySeparator,
    Content,
    HeaderCell,
    HeaderSeparator,
    Table,
    Row,
    TableContainer,
    TableOuterContainer
} from './Styles'

import { MappedCell } from './components/'
import { Checkbox } from 'components'

/**
 *
 * sticky header: sticky div with thead (table1)
 * scrolling body: tbody (table2)
 *
 * all cells focusable to edit when needed
 *
 */

// headers: array of headers
// content: 2d array of cells
// isSelectable: T/F to make rows selectable for some action
// valueUpdateHandler: () => {} for how table values should be updated
const StickyTable = ({content, valueUpdateHandler, isSelectable, isEditable, onSelectHandler, selectProps}) => {
    const [colWidths, updateColWidths] = useState([...Array(Object.keys(content).length).keys()].map(space => null))

    const [checkboxColWidth, updateCheckboxColWidth] = useState(null)

    const isDate = date => !isNaN(Date.parse(date))
    const sanitizeNumber = num => num < 10 ? '00': num
    const formatDate = date => `
    ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} @ ${sanitizeNumber(date.getHours())}:${sanitizeNumber(date.getMinutes())}:${sanitizeNumber(date.getSeconds())}`
    const sanitizedValue = value => isDate(value) ? formatDate(new Date(value)) : value

    return (
        <TableOuterContainer>
            <TableContainer>
                <Table>
                    <HeaderSeparator>
                        <Row>
                            {isSelectable && <HeaderCell isCheckbox={true} key={`header-checkbox`}>
                                <MappedCell
                                isCheckbox={true}
                                header={true}
                                updateColWidths={(width) => {
                                    updateCheckboxColWidth(width)
                                }}>
                                    selected
                                </MappedCell>
                            </HeaderCell>}
                            {Object.keys(content[0]).map((header, hidx) => (
                            <HeaderCell key={`header-${hidx}`}>
                                <MappedCell
                                header={true}
                                key={`content-${header}`}
                                updateColWidths={(width) => {
                                    colWidths[hidx] = width
                                    updateColWidths([...colWidths])
                                    //console.log(colWidths)
                                }}>
                                    {`${header.split('_').join(' ')}`}
                                </MappedCell>
                            </HeaderCell>))}
                        </Row>
                    </HeaderSeparator>
                    <BodySeparator>
                        {content.map((sample, ridx) => (
                        <Row key={`row-${ridx}`}>
                            {isSelectable &&
                                <BodyCell key={`cell-checkbox-${ridx}`}>
                                    <Content isCheckbox={true} width={checkboxColWidth}>
                                        <Checkbox
                                        checked={selectProps.items.has(sample[selectProps.property])}
                                        onChangeHandler={(e) => {
                                            onSelectHandler(ridx)
                                        }}
                                        containerWidth={'100%'} />
                                    </Content>
                                </BodyCell>}
                            {Object.keys(sample).map((header, idx) => (
                                <BodyCell key={`cell-${ridx}-${idx}`}>
                                    <Content width={colWidths[idx]}>
                                        <BodyContent
                                        type='text'
                                        value={sanitizedValue(sample[header]) || ''}
                                        onChange={valueUpdateHandler ? valueUpdateHandler(header, ridx): (e) => {}}
                                        readOnly={!isEditable}
                                        />
                                    </Content>
                                </BodyCell>)
                            )}
                        </Row>))}
                    </BodySeparator>
                </Table>
            </TableContainer>
        </TableOuterContainer>
)}

export default StickyTable
