import styled from 'styled-components'

export const FilterHeader = styled.div`
    width: 100%;
    display: inline-block;
    height: 2rem;
    color: ${props => props.theme.colour2};
    font-size: 1.3rem;
    font-weight: bold;
`

export const FilterRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 2%;
`

export const FilterContainer = styled.div`
    color: ${props => props.theme.colour2};
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FreeTextFilter = styled.input.attrs(props => ({
    type: 'text'
}))`
    width: 70%;
    color: ${props => props.theme.colour2};
    border: none;
    border-bottom: 1px solid ${props => props.theme.colour4};
    background-color: white;
    &:focus {
        border-bottom: 1px solid ${props => props.theme.colour5};
    }
`

export const FilterMenuContainer = styled.div`
    max-height: ${props => props.open ? '10em': '2rem'};
    overflow: hidden;
    transition: max-height 1s;
    border-bottom: 1px solid ${props => props.theme.colour2};
`
