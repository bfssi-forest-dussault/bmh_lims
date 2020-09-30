import styled from 'styled-components'

export const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    margin: 1.5rem 0px;
    background-color: white;
    border: 3px solid rgb(10, 60, 90);
    border-radius: 5px;
`

export const StyledTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
`

export const StyledTh = styled.th`
    background-color: rgb(10, 60, 90);
    color: white;
    padding: 5px 20px;
    width: 200px;
    position: sticky;
    top: 0;
`

export const StyledTd = styled.td`
    border-right: 1px solid rgb(100, 160, 190);
    border-bottom: 1px solid rgb(100, 160, 190);
    padding: 10px;
    min-width: 200px;
`
