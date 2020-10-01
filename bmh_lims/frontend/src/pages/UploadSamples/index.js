import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Table, CombinedLogo, FilledButton, InvertedLinkButton, FileInputButton } from 'components'
import { HeaderBar, PageContainer, FooterBar } from './Styles'
import { csvReader, xlsxReader } from 'utils'
import { theme } from 'styles'

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
        <ThemeProvider theme={theme}>
            <PageContainer>
                <HeaderBar>
                    <FileInputButton onChangeHandler={(e) => onClickHandleUpload(e, updateSubmittedFile, updateContent)} />
                    <Link to='/lims'><CombinedLogo height='50px' width='50px' /></Link>
                </HeaderBar>
                <Table headers={content.headers} content={content.content} />
                <FooterBar>
                    <InvertedLinkButton to='/lims'>cancel</InvertedLinkButton>
                    <FilledButton onClick={(e) => onClickSubmit(e, submittedFile)}>submit</FilledButton>
                </FooterBar>
            </PageContainer>
        </ThemeProvider>
    )
}

export default UploadSamplesPage
