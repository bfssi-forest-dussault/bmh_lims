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
    TableContainer
} from './Styles'

import { CheckboxColumn, MappedCell } from './components/'

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
const StickyTable = ({theme, headers, content, valueUpdateHandler, isSelectable, isEditable, onSelect}) => {
    const [colWidths, updateColWidths] = useState([...Array(headers.length).keys()].map(space => null))
    return (
        <TableContainer>
            {isSelectable && 
            <CheckboxColumn
            onSelect={onSelect}
            numRows={content.length}
            colour={theme.colour4}
            />}
            <Table>
                <HeaderSeparator>
                    <Row>
                        {headers.map((header, hidx) => (
                        <HeaderCell key={`header-${hidx}`}>
                            <MappedCell 
                            header={true}
                            key={`content-${header}`}
                            updateColWidths={(width) => {
                                colWidths[hidx] = width
                                updateColWidths([...colWidths])
                            }}>
                                {header}
                            </MappedCell>
                        </HeaderCell>))}
                    </Row>
                </HeaderSeparator>
                <BodySeparator>
                    {content.map((row, ridx) => {
                        console.log('rendered row')
                        return (
                    <Row key={`row-${ridx}`}>{
                        row.map((item, idx) => (
                            <BodyCell key={`cell-${ridx}-${idx}`}>
                                <Content width={colWidths[idx]}>
                                    <BodyContent
                                    type='text'
                                    value={item || ''}
                                    onChange={valueUpdateHandler ? valueUpdateHandler(idx, ridx): (e) => {}}
                                    readOnly={!isEditable}
                                    />
                                </Content>
                            </BodyCell>)
                    )}
                    </Row>)})}
                </BodySeparator>
            </Table>
        </TableContainer>
)}

export default StickyTable