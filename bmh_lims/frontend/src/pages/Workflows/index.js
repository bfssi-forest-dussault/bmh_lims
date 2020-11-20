import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import {
    CircularButtonBar,
    CombinedLogo,
    DropdownMenu,
    FilledButton,
    FilterMenu,
    Notice,
    Table
} from 'components'
import { LoadingIconContainer } from './Styles'
import { IconContext } from 'react-icons'
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
    height: 50%;
    position: relative;
    margin-bottom: 1%;
`

const LoadingContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AssignSection = ({theme}) => {
    const [samples, setSamples] = useState({headers: [], content: []})
    const [workflows, setWorkflows] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalContents, setModalContents] = useState({text: ''})
    const [isLoading, setIsLoading] = useState(true)

    const selectedIdx = new Set()
    let currentWorkflow = {id: -1, name: ''}

    useEffect(() => {
        const initializeSamples = async () => {
            try {
                const sampleRes = (await axios.get('/api/samples?page=1')).data
                const headers = Object.keys(sampleRes.results[0])
                const content = sampleRes.results.map(sample => Object.keys(sample).map(key => sample[key]))
                setSamples({headers, content})
                setIsLoading(false)
            } catch (err) {
                setModalContents({
                    text: 'Fetching samples failed',
                    onBackgroundClick: modalContents.onBackgroundClick,
                    CloseButton: () => (
                    <FilledButton onClick={(e) => {
                        setShowModal(false)
                    }}>close</FilledButton>)
                })
                setShowModal(true)
            }
        }
        const initializeWorkflows = async () => {
            try {
                const workflowRes = (await axios.get('/api/workflow_definitions')).data
                setWorkflows(workflowRes.results.map(workflow => ({id: workflow.id, name: workflow.name})))
            } catch (err) {
                setModalContents({
                    text: 'Fetching workflows failed',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            }
        }
        initializeSamples()
        initializeWorkflows()
    }, [])
    return (
        <BodyArea>
            {showModal && <Notice
                {...modalContents}
                onBackgroundClick={() => setShowModal(false)}
                CloseButton={() => (
                    <FilledButton onClick={(e) => {
                        setShowModal(false)
                    }}>close</FilledButton>)}
            />}
            <CircularButtonBar />
            <FilterMenu theme={theme} />
            <DropdownMenu
            menuItems={workflows.map(workflow => workflow.name)}
            theme={theme}
            initialValue={'Select Workflow'}
            onItemClick={(item, idx) => {
                currentWorkflow = workflows[idx]
            }}
            />
            {
                isLoading ? (
                    <IconContext.Provider value={{ color: theme.colour5, size: '3em' }}>
                        <LoadingContainer>
                            <LoadingIconContainer>
                                <CgSearchLoading />
                            </LoadingIconContainer>
                        </LoadingContainer>
                    </IconContext.Provider>
                    ):
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
            <FilledButton
            onClick={(e) => {
                let errors = ''
                if (currentWorkflow.id < 0) {
                    errors += 'Please select a workflow. '
                }
                if (selectedIdx.size === 0) {
                    errors += 'Please select at least 1 sample'
                }
                if (!!errors) {
                    setModalContents({
                        text: errors,
                        onBackgroundClick: modalContents.onBackgroundClick,
                        CloseButton: () => (
                        <FilledButton onClick={(e) => {
                            setShowModal(false)
                        }}>close</FilledButton>)
                    })
                    setShowModal(true)
                } else {
                    const selectedSamples = [...selectedIdx].map(idx => ({sample: samples.content[idx][0], parents: []}))
                    axios({
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                            'Content-type': 'application/json'
                        },
                        url: '/api/workflow_samplebatch_create/',
                        data: JSON.stringify({
                            samples: selectedSamples,
                            batch_type: currentWorkflow.name
                        })
                    }).then(res => {
                        console.log(res.data)
                    }).catch(rej => {
                        console.log(rej)
                    })
                }
            }}>Assign workflow</FilledButton>
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
