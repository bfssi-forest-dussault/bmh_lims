import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, CombinedLogo, StyledButton, Button, LinkButton } from 'components'
import styled, { css } from 'styled-components'
import { csvReader, xlsxReader } from 'icons'

const csvToTable = (text, updateContent) => {
    const lines = text.trim().split('\n').map(line => 
        line.split(','))
    updateContent({headers: lines[0], content: lines.slice(1, lines.length)})
}

const onClickHandleUpload = (event, updateSubmittedFile, updateContent) => {
    event.preventDefault()
    if(RegExp('\.[csv|tsv|xls|xlsx]$').test(event.target.files[0].name)) {
        const submittedFile = event.target.files[0]
        updateSubmittedFile({name: submittedFile.name, file: submittedFile})

        if(RegExp('\.[csv]$').test(submittedFile.name)) {
            csvReader(submittedFile, (text) => csvToTable(text, updateContent))
        } else if (RegExp('\.[xlsx|xlsx]$').test(submittedFile.name)) {
            xlsxReader(submittedFile, (text) => csvToTable(text, updateContent))
        }
    } else {
        console.log('invalid file type')
    }
}

const onClickSubmit = (event, submittedFile) => {
    event.preventDefault()
    if(submittedFile){
        console.log('submitted file')
    } else {
        console.log('no file submitted!!')
    }
}

const FileInputContainer = styled.div`
    position: relative;
    width: 50px;
`

const FileInput = styled.input`
    position: relative;
    opacity: 0;
    width: 100px;
    z-index: 2;
`
const FileInputButton = styled(StyledButton)`
    position: absolute;
    left: 0;
    z-index: 1;
`

const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const FooterBar = styled.div`
    display: flex;
    justify-content: right;
`

const UploadSamplesPage = () => {
    const [submittedFile, updateSubmittedFile] = useState({type: '', file: null})
    const [content, updateContent] = useState({headers: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'], content: [...Array(10).keys()].map((item, idx) => ['aaa', 'bbb', 'ccc', 'ddd', 'eee'])})
    return (
        <PageContainer>
            <HeaderBar>
                <FileInputContainer>
                    <FileInput type='file' onChange={(e) => onClickHandleUpload(e, updateSubmittedFile, updateContent)} />
                    <FileInputButton>upload</FileInputButton>
                </FileInputContainer>
                <Link to='/lims'><CombinedLogo height='50px' width='50px' /></Link>
            </HeaderBar>
            <Table headers={content.headers} content={content.content} />
            <FooterBar>
                <LinkButton styles={css`
                    border: 3px solid rgb(0, 180, 200);
                    color: rgb(0, 180, 200) !important;
                    background-color: white;
                    &:hover {
                        background-color: rgb(0, 180, 200);
                        color: white !important;
                    } 
                `} text='cancel' path='/lims' />
                <Button text='submit' onClickHandler={(e) => onClickSubmit(e, submittedFile)} />
            </FooterBar>
        </PageContainer>
    )
}

export default UploadSamplesPage
