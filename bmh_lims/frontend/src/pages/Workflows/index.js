import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import { CombinedLogo, Table, FilledButton } from 'components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import axios from 'axios'

const CircularButton = styled.button`
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colour5};
    width: 7rem;
    height: 7rem;
    color: white;
    font-size: 1.3em;
`

const DecorativeBar = styled.div`
    width: 20%;
    height: 10px;
    background-color: ${props => props.theme.colour5};
`

const CircularButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`

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

const CircularButtonBar = () => {
    return (
        <CircularButtonContainer>
            <CircularButton onClick={(e) => {console.log('assign')}}>assign</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('execute')}}>execute</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('enter results')}}>enter results</CircularButton>
        </CircularButtonContainer>
    )
}

const DropDownBar = styled.div`
    width: 80%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid ${props => props.theme.colour4};
    border-radius: 3%;
    padding: 0px 1.5%;
    color: ${props => props.theme.colour3}
`

const DropDownMenu = styled.div`
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    left: ${props => props.left ? `${props.left}px`:'28px'};
    top: ${props => props.top ? `${props.top}px`: '0px'};
    z-index: 1;
    width: 83.5%;
    background-color: white;
`

const DropDownButtonBackground = styled.div`
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: ${props => props.theme.colour2};
    border-left: 1px solid ${props => props.theme.colour4};
`

const DropdownMenuItem = styled.div`
    border: 1px solid ${props => props.theme.colour1};
    padding: 0px 1.5%;
`

const DropDownButton = ({theme, isDown, onClickHandler}) => {
    return (
        <DropDownButtonBackground onClick={onClickHandler}>
            {isDown ? <MdKeyboardArrowDown style={{fill: theme.colour4}}/> : <MdKeyboardArrowUp style={{fill: theme.colour4}}/>}
        </DropDownButtonBackground>
    )
}

const DropDownContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    flex-direction: column;
`

const DropDown = ({ theme, menuIsOpen, setMenuIsOpen, setLeft, setTop}) => {
    const [currentWorkflow, setWorkflow] = useState('Select workflow')
    let newLeft = 0
    let newTop = 0
    const dropdownBarRef = useCallback(node => {
        if(node !== null) {
            console.log(newLeft + node.getBoundingClientRect().left)
            newLeft += node.getBoundingClientRect().left
            newTop += node.getBoundingClientRect().bottom
            setLeft(newLeft)
            setTop(newTop)
        }
    }, [])
    const dropdownContainerRef = useCallback(node => {
        if(node !== null) {
            console.log(newLeft - node.getBoundingClientRect().left)
            newLeft -= node.getBoundingClientRect().left
            newTop -= node.getBoundingClientRect().top
            setLeft(newLeft)
            setTop(newTop)
        }
    }, [])
    return (
        <DropDownContainer ref={dropdownContainerRef}>
            <DropDownBar ref={dropdownBarRef}>
                {currentWorkflow}
                <DropDownButton
                theme={theme}
                isDown={!menuIsOpen}
                onClickHandler={(e) => {
                    setMenuIsOpen(!menuIsOpen)
                }} />
            </DropDownBar>
        </DropDownContainer>
    )
}

const TableContainer = styled.div`
    width: 100%;
    flex-grow: 5;
`

const ContentSection = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 7;
    width: 100%;
`

const AssignSection = ({theme}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [samples, setSamples] = useState({headers: [], content: []})
    const menuItems = ['workflow1', 'workflow2', 'workflow3']
    useEffect(() => {
        try {
            axios.get('/api/samples')
            .then(res => {
                const headers = Object.keys(res.data[0])
                const content = res.data.splice(0, 50).map(sample => Object.keys(sample).map(key => sample[key]))
                setSamples({headers, content})
            })
            .catch(rej => console.log(rej))
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <BodyArea>
            <CircularButtonBar />
            <ContentSection>
                <DropDown setTop={setTop} setLeft={setLeft} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} theme={theme}/>
                {menuIsOpen && (
                <DropDownMenu left={left} top={top}>
                    {menuItems.map((item, idx) => (
                    <DropdownMenuItem key={`workflow-${idx}`} onClick={(e) => setWorkflow(item)}>
                        {item}
                    </DropdownMenuItem>))}
                </DropDownMenu>
                )}
                <TableContainer>
                    <Table
                    theme={theme}
                    headers={samples.headers}
                    content={samples.content}
                    valueUpdateHandler={(col, row) => (e) => {console.log('hi')}}
                    isSelectable={true}
                    isEditable={false}
                    onSelect={(idx) => {

                    }}
                    />
                </TableContainer>
            </ContentSection>
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
