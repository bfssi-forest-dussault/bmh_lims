import styled from 'styled-components'

// table: sharp corners with shadows
// headers are divs (or add scroll to only t-body)

export const TableOuterContainer = styled.div`
    width: ${props => props.width || '100%'};
    min-height: ${props => props.minHeight || '20%'};
    height: ${props => props.height || '100%'};
    position: relative;
    margin: ${props => props.margin || '0 0 1% 0'};
`

export const TableContainer = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
    min-width: ${props => props.isCheckbox ? '100px': '120px'};
    color: ${props => props.header ? 'white' : props.theme.colour2};
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
    border: 1px solid ${props => props.theme.colour2};
    background-color: ${props => props.theme.colour2};
    padding: 3px;
    width: ${props => props.isCheckbox ? '100px' : '100%'};
    height: 50px;
`

export const BodyCell = styled.td`
    border: 1px solid rgb(200, 220, 240);
    padding: 3px;
`

export const BodyContent = styled.input`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: ${props => props.theme.colour2};
    width: 100%;
`
