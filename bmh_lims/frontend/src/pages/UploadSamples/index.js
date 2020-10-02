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

const contentToJSON = (content) => {
    const sampleData = content.content.map(row => row.reduce((acc, item, idx) => {
        acc[content.headers[idx]] = item
        return acc
    }, {}))
    console.log(sampleData)
    return sampleData
}

const validateData = (sampleData) => {
    // TODO: instantiate elsewhere
    const reqHeaders = [
        'sample_name',
        'tube/plate_label',
        'submitting_lab',
        'submission_date',
        'submission_format',
        'sample_volume_in_uL',
        'requested_services',
        'submitter_project_name',
        'genus',
        'species',
        'culture_date',
        'culture_conditions']
    const optHeaders = Set([
        'well',
        'project_id',
        'strain',
        'isolate',
        'subspecies/subtype/lineage',
        'approx_genome_size_in_bp',
        'details/comments',
        'dna_extraction_date',
        'dna_extraction_method',
        'qubit_dna_concentration_in_ng/uL'])
    // check if header exists and that data for the header was actually given
    reqHeaders.reduce((isValid, header) => isValid && header in sampleData && !!sampleData[header], true)
    // ensure all headers are valid
    Object.keys(sampleData).reduce((isValid, header) => isValid && (sampleData[header] in optHeaders || sampleData[header] in reqHeaders))
}

const onClickSubmit = (event,content, submittedFile) => {
    event.preventDefault()
    if(submittedFile){
        console.log(contentToJSON(content))
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
