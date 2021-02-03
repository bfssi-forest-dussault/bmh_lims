import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`

export const LoadingIconContainer = styled.div`
    animation: ${loadingAnimation} 2s infinite;
`

export const BodyArea = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 9;
    width: 75%;
    align-items: center;
    padding: 2% 12.5%;
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
    width: 90%;
    box-sizing: border-box;
    padding: 2% 0;
`
