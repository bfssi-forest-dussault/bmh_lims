import React from 'react'
import {ThemeProvider} from 'styled-components'
import {IconButton, IconLink, CombinedLogo} from 'components'
import {SampleIcon, StatusIcon, WorkflowsIcon} from 'icons'
import {ButtonBar, PageContainer, buttonAnimation} from './Styles'
import {theme} from 'styles'

// style props are kept as strings to retain both unit measures and quantity
const HomePage = () => {
    return (

        <ThemeProvider theme={theme}>

            <a href="/accounts/logout/" style={{
                backgroundColor: theme.colour6,
                color: 'white',
                padding: '0.25em 0.5em',
                textDecoration: 'none',
                borderRadius: '5px',
                alignSelf: 'flex-end',
                marginTop: -5,
                position: 'absolute'
            }}>Logout</a>

            <PageContainer>

                <h2>Welcome to</h2>
                <CombinedLogo height='20%' width='20%'/>
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
                        onClickHandler={(e) => e.preventDefault() || console.log('redirect to view status page')}/>
                    <IconLink
                        animation={buttonAnimation}
                        text='Workflows'
                        IconSVG={WorkflowsIcon}
                        iconProps={{
                            height: '10vw',
                            width: '10vw'
                        }}
                        path={'/workflows'}/>
                </ButtonBar>
            </PageContainer>
        </ThemeProvider>
    )
}

export default HomePage
