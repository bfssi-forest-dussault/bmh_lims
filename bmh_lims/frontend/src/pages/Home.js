import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { IconButton } from '../components'
import { Logo, SampleIcon, StatusIcon, WorkflowsIcon } from '../assets'

const ButtonBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-top: 25px; 
`

const Page = styled.div` 
    position: absolute;
    top: 4rem;
    bottom: auto;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const appear = keyframes`
    from{
        transform: translate(0px, 5px);
        opacity: 0;
    }
    to{
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

const HomePage = () => {
    return (
        <Page>
            <h2>Welcome to</h2>
            <Logo fill='#00AAB2' height='15em' width='15em' />
            <h1>BMH LIMS</h1>
            <p>What would you like to do?</p>
            <ButtonBar>
                <IconButton
                    animation={css`animation: ${appear} 0.5s linear 1;`}
                    text='Submit Samples' height='10em' width='10em'
                    IconSVG={SampleIcon}
                    onClickHandler={(e) => e.preventDefault() || console.log('redirect to submit samples page')} />
                <IconButton
                    animation={css`animation: ${appear} 0.5s linear 1;`}
                    text='View Status'
                    height='10em'
                    width='10em'
                    IconSVG={StatusIcon}
                    onClickHandler={(e) => e.preventDefault() || console.log('redirect to view status page')} />
                <IconButton
                    animation={css`animation: ${appear} 0.5s linear 1;`}
                    text='Workflows'
                    height='10em'
                    width='10em'
                    IconSVG={WorkflowsIcon}
                    onClickHandler={(e) => e.preventDefault() || console.log('redirect to workflows page')} />
            </ButtonBar>
        </Page>
    )
}

export default HomePage
