import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from 'styled-components'
import { Table, CombinedLogo, Button, LinkButton, FileInputButton } from 'components'
import { HeaderBar, PageContainer, FooterBar } from './Styles'
import { csvReader, xlsxReader } from 'utils'

const displayInTable = (dataText, updateContent) => {
    const lines = dataText.trim().split('\n').map(line => 
        line.split(','))
    updateContent({headers: lines[0], content: lines.slice(1, lines.length)})
}

const onClickHandleUpload = (event, updateSubmittedFile, updateContent) => {
    event.preventDefault()
    if(RegExp('\.[csv|xls|xlsx]$').test(event.target.files[0].name)) {
        const submittedFile = event.target.files[0]
        updateSubmittedFile({name: submittedFile.name, file: submittedFile})

        if(RegExp('\.[csv]$').test(submittedFile.name)) {
            csvReader(submittedFile, (dataText) => displayInTable(dataText, updateContent))
        } else if (RegExp('\.[xlsx|xlsx]$').test(submittedFile.name)) {
            xlsxReader(submittedFile, (dataText) => displayInTable(dataText, updateContent))
        }
    } else {
        console.log('invalid file type') // TODO: Toast
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

const UploadSamplesPage = () => {
    const [submittedFile, updateSubmittedFile] = useState({type: '', file: null})
    const [content, updateContent] = useState({headers: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'], content: [...Array(10).keys()].map((item, idx) => ['aaa', 'bbb', 'ccc', 'ddd', 'eee'])})
    return (
        <PageContainer>
            <HeaderBar>
                <FileInputButton onChangeHandler={(e) => onClickHandleUpload(e, updateSubmittedFile, updateContent)} />
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
