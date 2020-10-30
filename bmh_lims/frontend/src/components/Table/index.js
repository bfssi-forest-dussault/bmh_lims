import React, { useState, useCallback } from 'react'
import {
    BodyCell,
    BodyContent,
    BodySeparator,
    Content,
    HeaderCell,
    HeaderSeparator,
    HeaderTable,
    Row,
    TableContainer
} from './Styles'

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
const Table = ({headers, content, valueUpdateHandler, isSelectable}) => {
    const [colWidths, updateColWidths] = useState([...Array(headers.length).keys()].map(space => null))

    return (
        <TableContainer>
            <HeaderTable>
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
                    {content.map((row, ridx) => (<Row key={`row-${ridx}`}>{
                        row.map((item, idx) => {
                            return (
                            <BodyCell key={`cell-${ridx}-${idx}`}>
                                <Content width={colWidths[idx]}>
                                    <BodyContent
                                    type='text'
                                    value={item}
                                    onChange={valueUpdateHandler(idx, ridx)}
                                    onBlur={valueUpdateHandler(idx, ridx)}
                                    />
                                </Content>
                            </BodyCell>)
                    })
                    }</Row>))}
                </BodySeparator>
            </HeaderTable>
        </TableContainer>
)}

export default Table