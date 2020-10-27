import styled, { withTheme, css } from 'styled-components'
import React, { useCallback } from 'react'

// table: sharp corners with shadows
// headers are divs (or add scroll to only t-body)

export const TableContainer = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    background-color: white;
    border: 1px solid rgb(100, 100, 100);
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
`

export const Row = styled.tr`
    display: flex;
`

export const BodySeparator = styled.tbody`
`

export const Content = styled.div`
    min-width: 200px;
    background-color: white;
    width: ${props => props.width ? `${props.width}px` : 'auto'};
`

// border-collapse doesn't seem to enjoy flexbox
export const HeaderCell = styled.th`
    display: block;
    border: 1px solid rgb(200, 200, 200);
    padding: 0;
`

export const BodyCell = styled.td`
    border: 1px solid rgb(100, 100, 100);
    padding: 0;
`

export const MappedCell = ({updateColWidths, ...props}) => {
    const measuredRef = useCallback(node => {
        if (node !== null) {
            updateColWidths(node.getBoundingClientRect().width)
        }
    }, [])
    return (
    <Content ref={measuredRef}>
        {props.children}
    </Content>
    )
}