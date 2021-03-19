import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import {
    CombinedLogo,
} from 'components'
import {
    HeaderBar,
    PageContainer,
} from './Styles'
import { AssignSection } from './sections'

import {
    CircularButton,
    CircularButtonContainer, DecorativeBar
} from "./sections/components/CircularButtonBar/Styles";
import {BodyArea} from "pages/Workflows/sections/AssignSection/Styles";
import ExecuteSection from "./sections/ExecuteSection";
import ResultsSection from "./sections/ResultsSection";



const WorkflowsPage = () => {
    //const [activity, setActivity] = useState(-1)
    const activities = ['assign', 'execute', 'results']
    const [page, setPage] = useState('Assign')


    //Switch pages
    const viewPage = () => {
        switch (page) {
            case 'assign': return <AssignSection theme={theme} />;
            case 'execute': return <ExecuteSection/>;
            case 'results': return <ResultsSection/>;
            default: return <AssignSection theme={theme} />
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <HeaderBar>
                <Link to='/lims'><CombinedLogo height='50px' width='50px' inputColor='white' /></Link>
                </HeaderBar>
                <CircularButtonContainer>
                    <CircularButton onClick={(e) => {setPage('assign')}}>Assign</CircularButton>
                    <DecorativeBar />
                    <CircularButton onClick={(e) => {setPage('execute')}}>Execute</CircularButton>
                    <DecorativeBar />
                    <CircularButton onClick={(e) => {setPage('results')}}>Enter Results</CircularButton>
                </CircularButtonContainer>
                {/*<AssignSection theme={theme} />*/}
                {viewPage()}
            </PageContainer>
        </ThemeProvider>
    )
}

export default WorkflowsPage
