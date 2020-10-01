import React from 'react'
import { ThemeProvider } from 'styled-components'
import { IconButton, IconLink, CombinedLogo } from 'components'
import { SampleIcon, StatusIcon, WorkflowsIcon } from 'icons'
import { ButtonBar, PageContainer, buttonAnimation } from './Styles'
import { theme } from 'styles'

// style props are kept as strings to retain both unit measures and quantity
const HomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <h2>Welcome to</h2>
                <CombinedLogo height='20%' width='20%' />
                <p>What would you like to do?</p>
                <ButtonBar>
                    <IconLink
                        animation={buttonAnimation}
                        text='Submit Samples'
                        IconSVG={SampleIcon}
                        iconProps={{
                            height: '10vw',
                            width: '10vw'
                        }}
                        path='/upload'
                        />
                    <IconButton
                        animation={buttonAnimation}
                        text='View Status'
                        iconProps={{
                            height: '10vw',
                            width: '10vw'
                        }}
                        IconSVG={StatusIcon}
                        onClickHandler={(e) => e.preventDefault() || console.log('redirect to view status page')} />
                    <IconButton
                        animation={buttonAnimation}
                        text='Workflows'
                        iconProps={{
                            height: '10vw',
                            width: '10vw'
                        }}
                        IconSVG={WorkflowsIcon}
                        onClickHandler={(e) => e.preventDefault() || console.log('redirect to workflows page')} />
                </ButtonBar>
            </PageContainer>
        </ThemeProvider>
    )
}

export default HomePage
