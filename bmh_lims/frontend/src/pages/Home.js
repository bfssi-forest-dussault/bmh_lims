import React from 'react'
import styled from 'styled-components'
import { Button } from '../components'

const ButtonBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
`

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const HomePage = () => {
    return (
        <Page>
            <h1>Welcome</h1>
            <ButtonBar>
                <Button text="Submit Samples" onClickHandler={(e) => e.preventDefault() || console.log('redirect to submit samples page')} />
                <Button text="View Status" onClickHandler={(e) => e.preventDefault() || console.log('redirect to view status page')} />
                <Button text="Workflows" onClickHandler={(e) => e.preventDefault() || console.log('redirect to workflows page')} />
            </ButtonBar>
        </Page>
    )
}

export default HomePage
