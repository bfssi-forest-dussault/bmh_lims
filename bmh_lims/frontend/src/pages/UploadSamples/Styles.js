import styled from 'styled-components'

export const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.colour2};
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const BodyContainer = styled.div`
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10%;
`

export const TableContainer = styled.div`
    width: 100%;
    min-height: 20%;
    max-height: 80%;
    height: 50%;
    position: relative;
    margin: 5%;
`

export const ButtonContainer = styled.div`
    width: 100px;
`

export const FooterButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20%;
`

export const ButtonBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
