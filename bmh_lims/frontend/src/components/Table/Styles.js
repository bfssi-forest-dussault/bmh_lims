import styled, { withTheme } from 'styled-components'

// table: sharp corners with shadows
// headers are divs (or add scroll to only t-body)


/**
 * TableContainer (div)
 *  TableHeader (contains all headers) (div)
 *  TableBody (separate table--has scroll)
 *      Alternating row background colours (lighter theme colours maybe)
 */

export const TableContainer = styled.div`
    height: 100%;
    overflow-x: auto;
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

export const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    margin: 0;
    padding: 0;
    align-items: stretch;
    z-index: ${props => props.scroll ? 1 : 0};
`

export const StyledBody = styled.div`
    width: 100%;
    z-index: ${props => props.scroll ? 0 : 1};
    height: 50em;
`

export const StyledHeaderCell = styled.div`
    background-color: rgb(150, 200, 200);
    border: solid 1px rgb(100, 150, 150);
    color: white;
    min-width: 200px;
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0;
`

export const StyledTh = styled.th`
    background-color: rgb(10, 60, 90);
    color: white;
    padding: 5px 20px;
    width: 200px;
    position: sticky;
    top: 0;
`

const Styled = styled.td`
    border-right: 1px solid ${props => props.theme.secondarybg};
    border-bottom: 1px solid ${props => props.theme.secondarybg};
    min-width: 200px;
    margin: 0;
    padding: 0;
`

export const StyledTd = withTheme(Styled)