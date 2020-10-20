import React from 'react'
import { TableContainer, StyledTable, StyledTh, StyledTd, StyledHeader, StyledBody, StyledHeaderCell } from './Styles'

const evenOutRows = ({headers, content}) => {
    const evenedHeaders = [...headers]
    const evenedContent = []
    let maxLength = headers.length
    content.forEach(row => {
        if (row.length > maxLength) {
            maxLength = row.length
        }
    })
    const filler = [...Array(maxLength - headers.length).keys()].map(item => '')
    evenedHeaders.push(...filler)
    content.forEach((row, idx) => {
        evenedContent.push([...row])
        if (row.length !== maxLength) 
        {
            evenedContent[idx].push(...filler)
        }
    })
    return {headers: evenedHeaders, content: evenedContent}
}

// headers: array of headers
// content: 2d array of cells
const Table = ({headers, content}) => {
    const evenRows = evenOutRows({headers, content})
    return (
        <TableContainer>
            <StyledHeader>
                {evenRows.headers.map((header, idx) => (
                    <StyledHeaderCell key={`header-${idx}`}>{header}</StyledHeaderCell>
                ))}
            </StyledHeader>
            <StyledBody>
                <table>
                    <tbody>
                        {evenRows.content.map((row, rIdx) => (
                            <tr key={`row-${rIdx}`}>{
                                row.map((value, idx) => (
                                    <StyledTd key={`cell-${rIdx}-${idx}`}>{value}</StyledTd>
                                ))
                            }</tr>
                        ))}
                    </tbody>
                </table>
            </StyledBody>
            {/* <StyledTable>
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
            </StyledTable> */}
        </TableContainer>
)}

export default Table