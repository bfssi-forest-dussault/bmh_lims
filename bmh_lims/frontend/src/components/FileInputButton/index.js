import React from 'react'
import { FileInputContainer, FileInput, DummyButton } from './Styles'

const FileInputButton = ({ onChangeHandler }) => (
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} />
        <DummyButton>upload</DummyButton>
    </FileInputContainer>
)

export default FileInputButton