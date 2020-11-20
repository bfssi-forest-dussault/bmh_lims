import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`

export const LoadingIconContainer = styled.div`
    animation: ${loadingAnimation} 2s infinite;
`
