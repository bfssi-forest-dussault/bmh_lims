import styled from 'styled-components'

export const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
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
`

export const FooterButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12em;
`

export const FooterBar = styled.div`
    display: flex;
    justify-content: right;
    flex-grow: 1;
`
