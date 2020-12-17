import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { CgSearchLoading } from 'react-icons/cg'
import axios from 'axios'
import DateTime from 'luxon/src/datetime.js'
import {
    CircularButtonBar,
    DropdownMenu,
    FilledButton,
    Notice,
    Table
} from 'components'
import { formatFilterQueries } from 'utils'
import {
    BodyArea,
    LoadingContainer,
    LoadingIconContainer,
    ResultsContainer
} from './Styles'
import { FilterMenu } from './components'


export const AssignSection = ({theme}) => {
    const [samples, setSamples] = useState([])
    const [workflows, setWorkflows] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalContents, setModalContents] = useState({message: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [pageNumber, setPageNumer] = useState(1)
    const [resultCount, setResultCount] = useState(0)
    const [totalResultCount, setTotalResultCount] = useState(0)
    const [selectedIdxSet, setSelectedIdxSet] = useState(new Set())
    const [currentWorkflow, setCurrentWorkflow] = useState({id: -1, name: ''})

    const onAssignWorkflow = (e) => {
        let errors = ''
        if (currentWorkflow.id < 0) {
            errors += 'Please select a workflow. '
        }
        if (selectedIdxSet.size === 0) {
            errors += 'Please select at least 1 sample'
        }
        if (!!errors) {
            setModalContents({
                message: errors,
                onBackgroundClick: modalContents.onBackgroundClick,
                CloseButton: () => (
                <FilledButton onClick={(e) => {
                    setShowModal(false)
                }}>close</FilledButton>)
            })
            setShowModal(true)
        } else {
            const selectedSamples = [...selectedIdxSet].map(idx => ({sample: samples.content[idx][0], parents: []}))
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
                setModalContents({
                    message: 'Successfully assigned workflows',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            }).catch(rej => {
                console.log(rej)
                setModalContents({
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

    // Fetching table contents
    useEffect(() => {
        const initializeSamples = async () => {
            try {
                const sampleRes = (await axios.get(`/api/samples?page=${pageNumber}`)).data
                const content = sampleRes.results
                setTotalResultCount(sampleRes.count)
                setResultCount(sampleRes.results.length)
                setSamples(content)
                setIsLoading(false)
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
        initializeSamples()
        initializeWorkflows()
    }, [pageNumber])

    const refreshResults = async (filters) => {
        if (validateFilters(filters) === 0) {
            const queryString = formatFilterQueries(filters)
            const sampleResponse = await axios.get(`/api/samples/?${queryString}`)
            if (sampleResponse.data.count > 0) {
                const newSamples = sampleResponse.data.results
                const content = newSamples
                setSamples(content)
            } else {
                setModalContents({
                    message: 'Filter returned no results',
                    onBackgroundClick: modalContents.onBackgroundClick
                })
                setShowModal(true)
            }
        } else {
            setModalContents({
                message: 'Invalid filter input: invalid date range',
                onBackgroundClick: modalContents.onBackgroundClick
            })
            setShowModal(true)
        }
    }

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
            onUpdateHandler={refreshResults} />
            <DropdownMenu
            width='90%'
            menuItems={workflows.map(workflow => workflow.name)}
            theme={theme}
            currentSelection={currentWorkflow.name || 'Select workflow'}
            onItemClick={(idx) => {
                setCurrentWorkflow(workflows[idx])
            }} />
            {!isLoading && <ResultsContainer><p>{`Page ${pageNumber}`}</p><p>{`${selectedIdxSet.size} selected`}</p><p>{`Showing ${resultCount} of ${totalResultCount} results`}</p></ResultsContainer>}
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
                    <Table
                    content={samples}
                    isSelectable={true}
                    selectedRows={selectedIdxSet}
                    isEditable={false}
                    onSelectHandler={(idx) => {
                        if (selectedIdxSet.has(idx)) {
                            selectedIdxSet.delete(idx)
                            setSelectedIdxSet(new Set(selectedIdxSet))
                        } else {
                            selectedIdxSet.add(idx)
                            setSelectedIdxSet(new Set(selectedIdxSet))
                        }
                    }} />
            }
            <FilledButton
            width={'100%'}
            onClick={onAssignWorkflow}>
                Assign workflow
            </FilledButton>
        </BodyArea>
    )
}