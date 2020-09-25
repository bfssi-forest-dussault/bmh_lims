import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    background-color: white;
`

const StyledTable = styled.table`
    width: 100%;
    border: 2px solid rgb(0, 180, 200);
    border-collapse: collapse;
`

// headers: array of headers
// content: 2d array of cells
const Table = ({headers, content}) => (
<TableContainer>
    <StyledTable>
        <thead>
            <tr>
                {headers.map((header, idx) => (
                <th key={`header-${idx}`}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {content.map((row, rIdx) => (
                <tr key={`row-${rIdx}`}>
                    {row.map((cell, idx) => (
                    <td key={`cell-${rIdx}-${idx}`}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </StyledTable>
</TableContainer>
)

export default Table