import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import axios from 'axios'
import {
    CombinedLogo,
    FilledButton,
    FileInputButton,
    InvertedLinkButton,
    BlueButton,
    Modal,
    Table
} from 'components'
import {
    BodyContainer,
    ButtonBar,
    FooterButtonContainer, HeadButtonContainer,
    HeaderBar,
    PageContainer
} from './Styles'
import {
    csvReader,
    xlsxReader,
    validateData,
    isCSV,
    isExcel,
    dataToString
} from 'utils'
import { theme } from 'styles'

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

// page currently looks quite strange. This will be styled better later
const UploadSamplesPage = () => {
    const [isUploaded, updateIsUploaded] = useState(false)
    const [submitted, updateSubmitted] = useState({isSubmitted: false, isError: false, errorInfo: ''})
    const [isInvalid, updateIsInvalid] = useState(false)
    const [content, updateContent] = useState([...Array(30).keys()].map((idx) => ({
        ' ': ' ',
        '\t': ' ',
        '  ': ' ',
        '\t ': ' ',
        '   ': ' '
    })))
    const [labs, updateLabs] = useState(null)

    const uploadHandler = (event, updateIsUploaded, updateContent, updateIsInvalid) => {
        event.preventDefault()
        const submittedFile = event.target.files[0]
        updateIsUploaded(true)
        if(isCSV(submittedFile.name)) {
            csvReader(submittedFile, (sampleData) => updateContent(sampleData.slice(1, sampleData.length)))
        } else if (isExcel(submittedFile.name)) {
            xlsxReader(submittedFile, (sampleData) => {
                updateContent(sampleData)
            })
        } else {
            console.log('updating for invalid file')
            updateIsInvalid(true)
        }
    }

    const onClickSubmit = (event, content, submittedFile, updateSubmitted) => {
        const sanitizedSamples = content.map(({submitting_lab, ...otherFields}) => ({
            submitting_lab: labs[submitting_lab],
            ...otherFields
        }))
        event.preventDefault()
        if(submittedFile){
            const validation = validateData(content)
            if (!validation) {
                axios({
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                        'Content-type': 'application/json'
                    },
                    url: '/api/samples/',
                    data: JSON.stringify(sanitizedSamples) // TODO: Placeholder
                }).then((res) => {
                    console.log('success')
                    console.log(res.data)
                    updateSubmitted({isSubmitted: true, isError: false, errorInfo: ''})
                }).catch(rej => {
                    console.log('failed')
                    updateSubmitted({isSubmitted: true, isError: true, errorInfo: dataToString(rej.response.data)})
                })
            } else {
                updateSubmitted({isSubmitted: true, isError: true, errorInfo: validation})
            }
        } else {
            console.log('no file submitted!!')
        }
    }

    useEffect(() => {
        const initializeLabs = async () => {
            const labsRes = (await axios.get('/api/labs/')).data
            const labsList = labsRes.reduce((acc, currentLab) => {
                acc[currentLab.lab_name] = currentLab.id
                return acc
            }, {})
            updateLabs(labsList)
        }
        initializeLabs()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <HeaderBar>
                    <Link to='/lims'><CombinedLogo height='50px' width='50px' inputColor = 'white'/></Link>
                </HeaderBar>
                <BodyContainer>
                    <ButtonBar>
                        <HeadButtonContainer>
                            <FileInputButton onChangeHandler={(e) => uploadHandler(e, updateIsUploaded, updateContent, updateIsInvalid)} />
                            <BlueButton as='a' href='/lims' >Download Template</BlueButton>
                        </HeadButtonContainer>

                        <FooterButtonContainer>
                            <InvertedLinkButton to='/lims'>Cancel</InvertedLinkButton>
                            <FilledButton onClick={(e) => onClickSubmit(e, content, isUploaded, updateSubmitted)}>Submit</FilledButton>
                        </FooterButtonContainer>
                    </ButtonBar>
                    <Table
                    content={content}
                    valueUpdateHandler={(header, sampleIdx) => (e) => {
                        content[sampleIdx][header] = e.target.value
                        updateContent([...content])
                    }}
                    isSelectable={false}
                    isEditable={true}
                    />
                </BodyContainer>
            </PageContainer>
            {
                isInvalid &&
                <Modal message='Invalid filetype'
                    onBackgroundClick={() => updateIsInvalid(false)}
                    errorInfo={submitted.errorInfo}
                    CloseButton={() => <FilledButton onClick={(e) => {
                        updateSubmitted({isSubmitted: false, isError: false, errorInfo: ''})
                        updateIsInvalid(false)
                    }}>Close</FilledButton>}
                       background={theme.warning}
                />
            }
            {
                submitted.isSubmitted &&
                submitted.isError &&
                <Modal message='There was an error with your submission. Please look over it again.'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    info={submitted.errorInfo}
                    CloseButton={() => <FilledButton onClick={(e) => updateSubmitted({isSubmitted: false, isError: false, errorInfo: ''})}>Close</FilledButton>}
                       background={theme.warning}
                />
            } {
                submitted.isSubmitted &&
                !submitted.isError  &&
                (<Modal message='Samples uploaded successfully. Upload more?'
                    onBackgroundClick={() => updateSubmitted({isSubmitted: false, isError: false})}
                    ActionButton={() => <FileInputButton onChangeHandler={(e) => {
                                            uploadHandler(e, updateIsUploaded, updateContent, updateIsInvalid)
                                            updateSubmitted({isSubmitted: false, isError: false})
                                        }} />}
                    CloseButton={() => <InvertedLinkButton to='/lims'>Home</InvertedLinkButton>}
                        background={theme.success}
                        isSuccess={true}
                />)
            }
        </ThemeProvider>
    )
}

export default UploadSamplesPage
