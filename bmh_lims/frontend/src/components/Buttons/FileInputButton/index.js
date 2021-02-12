import React from 'react'
import { FileInputContainer, FileInput, DummyButton, DummyInvertedButton } from './Styles'

export const FileInputButton = ({ onChangeHandler }) => (
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} /> Upload

    </FileInputContainer>
)

export const InvertedFileInputButton = ({ onChangeHandler }) => {
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} />
        <DummyInvertedButton>Upload</DummyInvertedButton>
    </FileInputContainer>
}
