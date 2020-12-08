import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Table, CombinedLogo, FilledButton, InvertedLinkButton, FileInputButton, Notice } from 'components'
import { HeaderBar, PageContainer, FooterButtonContainer, BodyContainer, TableContainer, ButtonBar, ButtonContainer } from './Styles'
import { csvReader, xlsxReader, tableToData, validateData, isCSV, isExcel, dataToString } from 'utils'
import { theme } from 'styles'

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

const uploadHandler = (event, updateIsUploaded, updateContent, updateIsInvalid) => {
    event.preventDefault()
    const submittedFile = event.target.files[0]
    updateIsUploaded(true)
    if(isCSV(submittedFile.name)) {
        csvReader(submittedFile, (sampleData) => updateContent({headers: sampleData[0], content: sampleData.slice(1, sampleData.length)}))
    } else if (isExcel(submittedFile.name)) {
        xlsxReader(submittedFile, (sampleData) => {
            updateContent({headers: sampleData[0], content: sampleData.slice(1, sampleData.length)})
        })
    } else {
        console.log('updating for invalid file')
        updateIsInvalid(true)
    }
}

const formatSampleData = (content) => {
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
        const sampleData = formatSampleData(content)
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
                console.log('success')
                console.log(res.data)
                updateSubmitted({isSubmitted: true, isError: false, errorInfo: ''})
            }).catch(rej => {
                console.log('failed')
                updateSubmitted({isSubmitted: true, isError: true, errorInfo: dataToString(rej.response.data)})
            })
        } else {
            console.log('data not valid') // TODO: toast (also show info)
        }
    } else {
        console.log('no file submitted!!')
    }
}

// page currently looks quite strange. This will be styled better later
const UploadSamplesPage = () => {
    const [isUploaded, updateIsUploaded] = useState(false)
    const [submitted, updateSubmitted] = useState({isSubmitted: false, isError: false, errorInfo: ''})
    const [isInvalid, updateIsInvalid] = useState(false)
    const [content, updateContent] = useState({headers: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'], content: [...Array(50).keys()].map((item, idx) => ['aaa', 'bbb', 'ccc', 'ddd', 'eee'])})
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <HeaderBar>
                    <Link to='/lims'><CombinedLogo height='50px' width='50px' /></Link>
                </HeaderBar>
                <BodyContainer>
                    <ButtonBar>
                        <ButtonContainer>
                            <FileInputButton onChangeHandler={(e) => uploadHandler(e, updateIsUploaded, updateContent, updateIsInvalid)} />
                        </ButtonContainer>
                        <FooterButtonContainer>
                                <InvertedLinkButton to='/lims'>cancel</InvertedLinkButton>
                                <FilledButton onClick={(e) => onClickSubmit(e, content, isUploaded, updateSubmitted)}>submit</FilledButton>
                        </FooterButtonContainer>
                    </ButtonBar>
                    <TableContainer>
                        <Table
                        headers={content.headers}
                        content={content.content}
                        valueUpdateHandler={(col, row) => (e) => {
                            content.content[row][col] = e.target.value
                            updateContent({headers: content.headers, content: [...content.content]})
                        }}
                        isSelectable={false}
                        />
                    </TableContainer>
                </BodyContainer>
            </PageContainer>
            {
                isInvalid &&
                <Notice text='Invalid filetype'
                    onBackgroundClick={() => updateIsInvalid(false)}
                    errorInfo={submitted.errorInfo}
                    CloseButton={() => <FilledButton onClick={(e) => {
                        updateSubmitted({isSubmitted: false, isError: false, errorInfo: ''})
                        updateIsInvalid(false)
                    }}>close</FilledButton>}
                />
            }
            {
                submitted.isSubmitted && 
                submitted.isError && 
                <Notice text='There was an error with your submission. Please look over it again'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    info={submitted.errorInfo}
                    CloseButton={() => <FilledButton onClick={(e) => updateSubmitted({isSubmitted: false, isError: false, errorInfo: ''})}>close</FilledButton>}
                />
            } {
                submitted.isSubmitted && 
                !submitted.isError  && 
                (<Notice text='Samples uploaded successfully. Upload more?'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    ActionButton={() => <FileInputButton onChangeHandler={(e) => {
                                            uploadHandler(e, updateIsUploaded, updateContent, updateIsInvalid)
                                            updateSubmitted({isSubmitted: false, isError: false})
                                        }} />}
                    CloseButton={() => <InvertedLinkButton to='/lims'>back to home</InvertedLinkButton>}
                />)
            }
        </ThemeProvider>
    )
}

export default UploadSamplesPage
