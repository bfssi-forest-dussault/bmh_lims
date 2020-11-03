import styled from 'styled-components'

// table: sharp corners with shadows
// headers are divs (or add scroll to only t-body)

export const TableContainer = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    background-color: white;
    max-height: 30em;
    display: flex;
    flex-direction: row;
`

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`

export const HeaderSeparator = styled.thead`
    top:0;
    position: sticky;
    width: 100%;
`

export const Row = styled.tr`
    display: flex;
    width: 100%;
`

export const BodySeparator = styled.tbody`
`

export const Content = styled.div`
    min-width: 200px;
    color: ${props => props.header ? 'white' : 'rgb(10, 60, 90)'};
    font-weight: ${props => props.header ? '900': 'normal'};
    width: ${props => props.width ? `${props.width}px` : 'auto'};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.header ? 'center': 'flex-start'};
`

// border-collapse doesn't seem to enjoy flexbox
export const HeaderCell = styled.th`
    display: block;
    border: 1px solid rgb(10, 60, 90);
    background-color: rgb(10, 60, 90);
    padding: 3px;
    width: 100%;
    height: 50px;
`

export const BodyCell = styled.td`
    border: 1px solid rgb(200, 220, 240);
    padding: 3px;
`

export const BodyContent = styled.input`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(10, 60, 90);
    width: 100%;
`
