import styled from 'styled-components'
import { FilledButton, InvertedButton } from '../Styles'

export const FileInputContainer = styled.label`
    //position: relative;
      font-size: 1em;
    border-radius: 5px;
    min-height: 40px;
    width: ${props => props.width || '100px'};
    margin: 0 2px 0 2px;
     background: ${props => props.theme.colour5};
    color: white;
    border: none;
  cursor: pointer;
  text-align: center;
    line-height: 44px;
  &:hover {
      background: #c65612;
    }
`

export const FileInput = styled.input`
    width: 80px;
    height: 50px;
    position: absolute;
    opacity: 0;
    z-index: 2;
  display: none;
`

export const DummyButton = styled(FilledButton)`
    //position: absolute;
    left: 0;
    z-index: 1;
    height: 44px;
`

export const DummyInvertedButton = styled(InvertedButton)`
    position: absolute;
    left: 0;
    z-index: 1;
`
