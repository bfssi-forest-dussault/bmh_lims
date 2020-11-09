import styled from 'styled-components'

export const ColumnTable = styled.table`
    border-collapse: collapse;
    table-layout: fixed;
`

export const ColumnRow = styled.tr`
    display: flex;
    width: 100%;
`

export const CheckboxContent = styled.div`
    color: ${props => props.header ? 'white' : props.theme.colour2};
    font-weight: ${props => props.header ? '900': 'normal'};
    width: ${props => props.width ? `${props.width}px` : 'auto'};
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    border: 1px solid rgb(200, 220, 240);
    padding: 3px;
    width: 100px;
`

export const CheckboxHeaderContent = styled.div`
    color: ${props => props.header ? 'white' : props.theme.colour2};
    font-weight: ${props => props.header ? '900': 'normal'};
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.header ? 'center': 'flex-start'};
`

export const CheckboxHeaderCell = styled.th`
    display: block;
    border: 1px solid ${props => props.theme.colour2};
    background-color: ${props => props.theme.colour2};
    padding: 3px;
    width: 100px;
    height: 50px;
`