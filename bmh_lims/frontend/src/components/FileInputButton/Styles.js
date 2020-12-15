import styled from 'styled-components'
import { FilledButton, InvertedButton } from 'components'

export const FileInputContainer = styled.div`
    position: relative;
`

export const FileInput = styled.input`
    width: 80px;
    position: absolute;
    opacity: 0;
    z-index: 2;
`

export const DummyButton = styled(FilledButton)`
    position: absolute;
    left: 0;
    z-index: 1;
`

export const DummyInvertedButton = styled(InvertedButton)`
    position: absolute;
    left: 0;
    z-index: 1;
`