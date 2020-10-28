import React, { useState, useEffect } from 'react'
import { TableContainer, Row, HeaderCell, BodyCell, HeaderTable, HeaderSeparator, BodySeparator, Content, MappedCell } from './Styles'

// ********** commenting this section out until we confirm we no longer need it **********

// const evenOutRows = ({headers, content}) => {
//     const evenedHeaders = [...headers]
//     const evenedContent = []
//     let maxLength = headers.length
//     content.forEach(row => {
//         if (row.length > maxLength) {
//             maxLength = row.length
//         }
//     })
//     const filler = [...Array(maxLength - headers.length).keys()].map(item => '')
//     evenedHeaders.push(...filler)
//     content.forEach((row, idx) => {
//         evenedContent.push([...row])
//         if (row.length !== maxLength) 
//         {
//             evenedContent[idx].push(...filler)
//         }
//     })
//     return {headers: evenedHeaders, content: evenedContent}
// }

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
const Table = ({headers, content}) => {
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
                            return <BodyCell key={`cell-${ridx}-${idx}`}><Content width={colWidths[idx]}>{item}</Content></BodyCell>
                    })
                    }</Row>))}
                </BodySeparator>
            </HeaderTable>
        </TableContainer>
)}

export default Table