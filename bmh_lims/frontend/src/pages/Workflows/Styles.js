import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`

export const LoadingIconContainer = styled.div`
    animation: ${loadingAnimation} 2s infinite;
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    align-items: center;
`

export const HeaderBar = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: ${props => props.theme.colour2};
    border-bottom: 2px solid ${props => props.theme.colour2};
    color: white;
    align-items: center;
    height: 7%;
`

export const BodyArea = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 9;
    width: 50%;
    padding: 2% 25%;
`

export const TableContainer = styled.div`
    width: 100%;
    min-height: 20%;
    height: 50%;
    position: relative;
    margin-bottom: 1%;
`

export const LoadingContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ResultsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colour2};
`

export const DropdownMenuContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 2% 5%;
`