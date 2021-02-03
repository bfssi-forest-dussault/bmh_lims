import styled from 'styled-components'

export const ColumnTable = styled.table`
    border-collapse: collapse;
    table-layout: fixed;
`

export const ColumnRow = styled.tr`
    display: flex;
    width: 100%;
`

export const CheckBox = styled.input`
    color: rgb(10, 60, 90);
    margin: 1.5px;
`

export const CheckBoxHeaderCell = styled.th`
    display: block;
    border: 1px solid rgb(10, 60, 90);
    background-color: ${props => props.theme.colour2};
    padding: 3px;
    height: 50px;
`

export const CheckboxBodyCell = styled.td`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 19px;
    padding: 3px;
    border: 1px solid rgb(200, 220, 240);
`

export const CheckboxHeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    font-weight: 900;
    color: white;
`

export const CheckboxHeaderCell = styled.th`
    display: block;
    border: 1px solid ${props => props.theme.colour2};
    background-color: ${props => props.theme.colour2};
    padding: 3px;
    width: 100px;
    height: 50px;
`
