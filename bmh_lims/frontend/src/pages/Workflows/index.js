import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import { CombinedLogo, Table, FilledButton } from 'components'
import { CircularButtonBar, DropdownMenu } from 'components'
import { CgSearchLoading } from 'react-icons/cg'
import axios from 'axios'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    align-items: center;
`

const HeaderBar = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: ${props => props.theme.colour2};
    border-bottom: 2px solid ${props => props.theme.colour2};
    color: white;
    align-items: center;
    height: 7%;
`

const BodyArea = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 9;
    width: 50%;
    padding: 2% 25%;
`

const TableContainer = styled.div`
    width: 100%;
    flex-grow: 5;
`

const AssignSection = ({theme}) => {
    const [samples, setSamples] = useState({headers: [], content: []})
    const menuItems = ['Sample Submission', 'DNA Extraction', 'DNA Processing', 'Library Prep', 'Sequencing']
    const [isLoading, setIsLoading] = useState(true)

    const selectedIdx = new Set()

    useEffect(() => {
        try {
            axios.get('/api/samples?page=1')
            .then(res => {
                const headers = Object.keys(res.data.results[0])
                const content = res.data.results.map(sample => Object.keys(sample).map(key => sample[key]))
                setSamples({headers, content})
                setIsLoading(false)
            })
            .catch(rej => console.log(rej))
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <BodyArea>
            <CircularButtonBar />
            <DropdownMenu menuItems={menuItems} theme={theme} initialValue={'Select Workflow'}/>
            {
                isLoading ? <CgSearchLoading style={{fill: theme.colour2}}/>:
                <TableContainer>
                    <Table
                    theme={theme}
                    headers={samples.headers}
                    content={samples.content}
                    isSelectable={true}
                    isEditable={false}
                    onSelect={(idx) => {
                        if (!selectedIdx.delete(idx)) {
                            selectedIdx.add(idx)
                        }
                    }}
                    />
                </TableContainer>
            }
            <FilledButton onClick={(e) => {console.log('blue button clicked')}}>Assign workflow</FilledButton>
        </BodyArea>
    )
}

const WorkflowsPage = () => {
    const [activity, setActivity] = useState(-1)
    const activities = ['assign', 'execute', 'results']
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <HeaderBar>
                <Link to='/lims'><CombinedLogo height='50px' width='50px' /></Link>
                </HeaderBar>
                <AssignSection theme={theme} />
            </PageContainer>
        </ThemeProvider>
    )
}

export default WorkflowsPage
