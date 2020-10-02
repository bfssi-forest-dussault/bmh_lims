import styled, { keyframes, css } from 'styled-components'

// will worry about more responsiveness another time

export const ButtonBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-top: 25px; 
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
`

// keeping this here for now since it's just one animation
export const appear = keyframes`
    from{
        transform: translate(0px, 5px);
        opacity: 0;
    }
    to{
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

export const buttonAnimation = css`
    animation: ${appear} 0.5s linear 1;
    &:hover {
        transition: transform 0.5s;
        transform: scale(1.2);
    }
    &:active {
        transition: transform 0s;
        transform: scale(1);
    }
`