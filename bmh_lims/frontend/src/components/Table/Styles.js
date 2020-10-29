import styled from 'styled-components'

// table: sharp corners with shadows
// headers are divs (or add scroll to only t-body)

export const TableContainer = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    background-color: white;
    max-height: 30em;
`

export const HeaderTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
`

export const HeaderSeparator = styled.thead`
    top:0;
    position: sticky;
    width: 100%;
`

export const Row = styled.tr`
    display: flex;
`

export const BodySeparator = styled.tbody`
`

export const Content = styled.div`
    min-width: 200px;
    background-color: ${props => props.header ? 'rgb(10, 60, 90)' : 'white'};
    color: ${props => props.header ? 'white' : 'rgb(10, 60, 90)'};
    font-weight: ${props => props.header ? '900': 'normal'};
    width: ${props => props.width ? `${props.width}px` : 'auto'};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

// border-collapse doesn't seem to enjoy flexbox
export const HeaderCell = styled.th`
    display: block;
    border: 1px solid rgb(10, 60, 90);
    padding: 0;
    width: 100%;
    height: 50px;
`

export const BodyCell = styled.td`
    border: 1px solid rgb(200, 220, 240);
    padding: 0;
`
