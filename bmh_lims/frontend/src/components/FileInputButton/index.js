import React from 'react'
import styled from 'styled-components'
import { StyledButton } from 'components'

const FileInputContainer = styled.div`
    position: relative;
    width: 50px;
`

const FileInput = styled.input`
    position: relative;
    opacity: 0;
    width: 100px;
    z-index: 2;
`
const DummyButton = styled(StyledButton)`
    position: absolute;
    left: 0;
    z-index: 1;
`

const FileInputButton = ({ onChangeHandler }) => (
    <FileInputContainer>
        <FileInput type='file' onChange={onChangeHandler} />
        <DummyButton>upload</DummyButton>
    </FileInputContainer>
)

export default FileInputButton