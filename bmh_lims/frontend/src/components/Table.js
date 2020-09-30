import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    margin: 1.5rem 0px;
    background-color: white;
    border: 3px solid rgb(10, 60, 90);
    border-radius: 5px;
`

const StyledTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
`

const StyledTh = styled.th`
    background-color: rgb(10, 60, 90);
    color: white;
    padding: 5px 20px;
    width: 200px;
    position: sticky;
    top: 0;
`

const StyledTd = styled.td`
    border-right: 1px solid rgb(100, 160, 190);
    border-bottom: 1px solid rgb(100, 160, 190);
    padding: 10px;
    min-width: 200px;
`

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