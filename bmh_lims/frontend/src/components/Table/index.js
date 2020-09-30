import React from 'react'
import { TableContainer, StyledTable, StyledTh, StyledTd } from './Styles'

const evenOutRows = ({headers, content}) => {
    let maxLength = headers.length
    content.forEach(row => {
        if (row.length > maxLength) {
            maxLength = row.length
        }
    })
    const filler = [...Array(maxLength - headers.length).keys()].map(item => '')
    headers.push(...filler)
    content.forEach(row => {
        if (row.length !== maxLength) {
            row.push(...filler)
        }
    })
    return {headers, content}
}

// headers: array of headers
// content: 2d array of cells
const Table = ({headers, content}) => {
    const evenRows = evenOutRows({headers, content})
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {evenRows.headers.map((header, idx) => (
                        <StyledTh key={`header-${idx}`}>{header}</StyledTh>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {evenRows.content.map((row, rIdx) => (
                        <tr key={`row-${rIdx}`}>
                            {row.map((cell, idx) => (
                            <StyledTd key={`cell-${rIdx}-${idx}`}>{cell}</StyledTd>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
)}

export default Table