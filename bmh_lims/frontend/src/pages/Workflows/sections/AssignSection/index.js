import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { CgSearchLoading } from 'react-icons/cg'
import axios from 'axios'
import DateTime from 'luxon/src/datetime.js'
import {
    DropdownMenu,
    FilledButton,
    Modal,
    Table,
    MaterialTable
} from 'components'
import { formatFilterQueries } from 'utils'
import {
    BodyArea,
    LoadingContainer,
    LoadingIconContainer,
    ResultsContainer
} from './Styles'
import { FilterMenu } from './components'
import { CircularButtonBar } from '../components'


export const AssignSection = ({theme}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalContents, setModalContents] = useState({message: ''})
    const [samples, setSamples] = useState([])
    const [workflows, setWorkflows] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalResultCount, setTotalResultCount] = useState(0)
    const [selectedSamples, setSelectedSamples] = useState({property: 'id', items: new Set()})
    const [currentWorkflow, setCurrentWorkflow] = useState({id: -1, name: ''})

    const onAssignWorkflow = (e) => {
        let errors = ''
        if (currentWorkflow.id < 0) {
            errors += 'Please select a workflow. '
        }
        if (selectedSamples.items.size === 0) {
            errors += 'Please select at least 1 sample'
        }
        if (!!errors) {
            setModalContents({
                background:theme.warning,
                message: errors,
                onBackgroundClick: modalContents.onBackgroundClick,
                CloseButton: () => (
                <FilledButton onClick={(e) => {
                    setShowModal(false)
                }}>close</FilledButton>)
            })
            setShowModal(true)
        } else {
            const selectedSampleRequest = [...selectedSamples.items].map(sampleId => ({sample: sampleId, parents: []}))
            axios({
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'Content-type': 'application/json'
                },
                url: '/api/workflow_samplebatch_create/',
                data: JSON.stringify({
                    samples: selectedSampleRequest,
                    batch_type: currentWorkflow.name
                })
            }).then(res => {
                setModalContents({
                    background:theme.success,
                    isSuccess:true,
                    message: 'Successfully assigned workflows',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
                setSelectedSamples({property: 'id', items: new Set()})
                setCurrentWorkflow({id: -1, name: ''})
            }).catch(rej => {
                console.log(rej)
                setModalContents({
                    background:theme.warning,
                    message: 'Workflows assignment unsuccessful',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            })
        }
    }

    const isBefore = (earlier, later) => {
        const [d1, d2, m1, m2, y1, y2] = [earlier.day, later.day, earlier.month, later.month, earlier.year, later.year]
        return y1 < y2 || (y1 === y2 && (m1 < m2 || (m1 === m2 && d1 < d2)))
    }

    const validateFilters = (filters) => {
        const [earlier, later] = filters.dateRange.match
        if (!!earlier && !!later && (isBefore(later, earlier) || isBefore(DateTime.fromJSDate(new Date()), earlier) || isBefore(DateTime.fromJSDate(new Date()), later))) {
            return 1
        }
        return 0
    }

    const refreshResults = async (filters) => {
        setIsLoading(true)
        if (validateFilters(filters) === 0) {
            const queryString = formatFilterQueries(filters)
            const sampleResponse = await axios.get(`/api/samples/?${queryString}`)
            if (sampleResponse.data.count > 0) {
                const newSamples = sampleResponse.data.results
                const content = newSamples
                setTotalResultCount(sampleResponse.data.count)
                setSamples(content)
            } else {
                setModalContents({
                    message: 'Filter returned no results',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            }
            setIsLoading(false)
        } else {
            setModalContents({
                message: 'Invalid filter input: invalid date range',
                onBackgroundClick: modalContents.onBackgroundClick
            })
            setShowModal(true)
        }
    }

    // Fetching table contents
    useEffect(() => {
        const initializeSamples = async () => {
            try {
                const sampleRes = (await axios.get(`/api/samples?page=${pageNumber}`)).data
                const content = sampleRes.results
                setTotalResultCount(sampleRes.count)
                setSamples(content)
                setIsLoading(false)
                //console.log(content)
            } catch (err) {
                console.log(err)
                setModalContents({
                    message: 'Fetching samples failed',
                    onBackgroundClick: modalContents.onBackgroundClick,
                    CloseButton: () => (
                    <FilledButton onClick={(e) => {
                        setShowModal(false)
                    }}>close</FilledButton>)
                })
                setShowModal(true)
            }
        }
        initializeSamples()
    }, [pageNumber])

    useEffect(() => {
        const initializeWorkflows = async () => {
            try {
                const workflowRes = (await axios.get('/api/workflow_definitions')).data
                setWorkflows(workflowRes.results.map(workflow => ({id: workflow.id, name: workflow.name})))
            } catch (err) {
                console.log(err)
                setModalContents({
                    message: 'Fetching workflows failed',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            }
        }
        initializeWorkflows()
    }, [])

    return (
        <BodyArea>
            {showModal && <Modal
                {...modalContents}
                onBackgroundClick={() => setShowModal(false)}
                CloseButton={() => (
                    <FilledButton onClick={(e) => {
                        setShowModal(false)
                    }}>Close</FilledButton>)}
            />}
            <CircularButtonBar />
            <FilterMenu
            theme={theme}
            onUpdateHandler={refreshResults} />
            <DropdownMenu
            width='90%'
            menuItems={workflows.map(workflow => workflow.name)}
            theme={theme}
            currentSelection={currentWorkflow.name || 'Select workflow'}
            onItemClick={(idx) => {
                setCurrentWorkflow(workflows[idx])
            }} />
            {!isLoading && <ResultsContainer><p>{`Page ${pageNumber}`}</p><p>{`${selectedSamples.items.size} selected`}</p><p>{`Showing ${samples.length} of ${totalResultCount} results`}</p></ResultsContainer>}
            {
                isLoading ? (
                    <IconContext.Provider value={{ color: theme.colour5, size: '3em' }}>
                        <LoadingContainer>
                            <LoadingIconContainer>
                                <CgSearchLoading />
                            </LoadingIconContainer>
                        </LoadingContainer>
                    </IconContext.Provider>
                    ):<MaterialTable content={samples}/>
                    // <Table
                    // content={samples}
                    // isSelectable={true}
                    // selectProps={selectedSamples}
                    // isEditable={false}
                    // onSelectHandler={(idx) => {
                    //     if (selectedSamples.items.has(samples[idx][selectedSamples.property])) {
                    //         selectedSamples.items.delete(samples[idx][selectedSamples.property])
                    //         setSelectedSamples({property: 'id', items: new Set(selectedSamples.items)})
                    //     } else {
                    //         selectedSamples.items.add(samples[idx][selectedSamples.property])
                    //         setSelectedSamples({property: 'id', items: new Set(selectedSamples.items)})
                    //     }
                    // }} />
            }
            <FilledButton
            width={'100%'}
            onClick={onAssignWorkflow}>
                Assign workflow
            </FilledButton>
        </BodyArea>
    )
}
