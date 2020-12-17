import React from 'react'
import { FileInputContainer, FileInput, DummyButton, DummyInvertedButton } from './Styles'

export const FileInputButton = ({ onChangeHandler }) => (
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} />
        <DummyButton>upload</DummyButton>
    </FileInputContainer>
)

export const InvertedFileInputButton = ({ onChangeHandler }) => {
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} />
        <DummyInvertedButton>upload</DummyInvertedButton>
    </FileInputContainer>
}
