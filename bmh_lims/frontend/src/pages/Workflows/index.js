import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { IconContext } from 'react-icons'
import { CgSearchLoading } from 'react-icons/cg'
import axios from 'axios'
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
import {
    BodyArea,
    HeaderBar,
    LoadingContainer,
    LoadingIconContainer,
    PageContainer,
    TableContainer,
    DropdownMenuContainer
} from './Styles'
import { formatFilterQueries } from 'utils'

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
            <FilterMenu
            theme={theme}
            onUpdateHandler={async (filters) => {
                const queryString = formatFilterQueries(filters)
                const newSamples = (await axios.get(`/api/samples/?${queryString}`)).data.results
                const headers = Object.keys(newSamples[0])
                const content = newSamples.map(sample => Object.keys(sample).map(key => sample[key]))
                setSamples({headers, content})
            }}
            />
            <DropdownMenuContainer>
                <DropdownMenu
                menuItems={workflows.map(workflow => workflow.name)}
                theme={theme}
                initialValue={'Select Workflow'}
                onItemClick={(item, idx) => {
                    currentWorkflow = workflows[idx]
                }}
                />
            </DropdownMenuContainer>
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
