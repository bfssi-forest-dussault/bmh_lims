import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Table, CombinedLogo, FilledButton, InvertedLinkButton, FileInputButton, Notice } from 'components'
import { HeaderBar, PageContainer, FooterBar, FooterButtonContainer } from './Styles'
import { csvReader, xlsxReader, csvToJSON, tableToData } from 'utils'
import { theme } from 'styles'

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true


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

const displayInTable = (dataText, updateContent) => {
    const lines = csvToJSON(dataText)
    updateContent({headers: lines[0], content: lines.slice(1, lines.length)})
}

const onClickHandleUpload = (event, updateSubmittedFile, updateContent) => {
    event.preventDefault()
    if(RegExp('\.[csv|xls|xlsx]$').test(event.target.files[0].name)) {
        const submittedFile = event.target.files[0]
        updateSubmittedFile({name: submittedFile.name, file: submittedFile})

        if(RegExp('\.[csv]$').test(submittedFile.name)) {
            csvReader(submittedFile, (dataText) => {
                displayInTable(dataText, updateContent)
            })
        } else if (RegExp('\.[xlsx|xlsx]$').test(submittedFile.name)) {
            xlsxReader(submittedFile, (dataJSON) => updateContent({headers: dataJSON[0], content: dataJSON.slice(1, dataJSON.length)}))
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

const onClickSubmit = (event,content, submittedFile, updateSubmitted) => {
    event.preventDefault()
    if(submittedFile){
        const sampleData = contentToJSON(content)
        if (validateData(sampleData)) {
            axios({
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'Content-type': 'application/json'
                },
                url: '/api/samples/',
                data: JSON.stringify(tableToData(content)) // TODO: Placeholder
            }).then((res) => {
                console.log(res) // TODO: toast
                updateSubmitted({isSubmitted: true, isError: false})
            }).catch(rej => {
                console.log(rej) // TODO: format
                updateSubmitted({isSubmitted: true, isError: true})
            })
        }
    } else {
        console.log('no file submitted!!')
    }
}

// page currently looks quite strange. This will be styled better later
const UploadSamplesPage = () => {
    const [submittedFile, updateSubmittedFile] = useState({type: '', file: null})
    const [submitted, updateSubmitted] = useState({isSubmitted: false, isError: false})
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
                    <FooterButtonContainer>
                        <InvertedLinkButton to='/lims'>cancel</InvertedLinkButton>
                        <FilledButton onClick={(e) => onClickSubmit(e, content, submittedFile, updateSubmitted)}>submit</FilledButton>
                    </FooterButtonContainer>
                </FooterBar>
            </PageContainer>
            {
                submitted.isSubmitted && 
                submitted.isError && 
                <Notice text='There was an error with your submission. Please look over it again'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    CloseButton={() => <FilledButton onClickHander={(e) => updateSubmitted({isSubmitted: false, isError: false})}>close</FilledButton>}
                />
            } {
                submitted.isSubmitted && 
                !submitted.isError  && 
                (<Notice text='Samples uploaded successfully. Upload more?'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    ActionButton={() => <FileInputButton onChangeHandler={(e) => {
                                            updateSubmitted({isSubmitted: false, isError: false})
                                            onClickHandleUpload(e, updateSubmittedFile, updateContent)
                                        }} />}
                    CloseButton={() => <InvertedLinkButton to='/lims'>back to home</InvertedLinkButton>}
                />)
            }
        </ThemeProvider>
    )
}

export default UploadSamplesPage
