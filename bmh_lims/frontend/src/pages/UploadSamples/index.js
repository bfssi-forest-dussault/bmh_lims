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
    console.log(lines)
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
        if (!!content.headers[idx]) {
            acc[content.headers[idx]] = item
        } else {
            return false // TODO: Toast
        }
        return acc
    }, {}))
    return sampleData
}

const validateData = (sampleData) => {
    // TODO: instantiate elsewhere
    const reqHeaders = new Set([
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
        'culture_conditions'])
    const optHeaders = new Set([
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
    // ensure all headers are expected and that some value is given for required headers
    const sampleIsValid = (sample) => Object.keys(sample).reduce((isValid, header) => isValid && ((reqHeaders.has(header) && !!sample[header]) || optHeaders.has(header)), true)
    return sampleData.reduce((allIsValid, sample) => allIsValid && sampleIsValid(sample), true)
}

const onClickSubmit = (event,content, submittedFile) => {
    event.preventDefault()
    if(submittedFile){
        const sampleData = contentToJSON(content)
        if (validateData(sampleData)) {
            console.log('send data...')
        }
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
                    <FilledButton onClick={(e) => onClickSubmit(e, content, submittedFile)}>submit</FilledButton>
                </FooterBar>
            </PageContainer>
        </ThemeProvider>
    )
}

export default UploadSamplesPage
