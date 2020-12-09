
import { Link } from 'react-router-dom'
import styled, { css, withTheme } from 'styled-components'

const ButtonBase = css`
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 5px;
    min-height: 1.5em;
    width: 100%;
    text-align: center;
`

const FilledButtonBase = styled.button`
    background: ${props => props.theme.colour5};
    color: white;
    border: none;
    ${ButtonBase}
`

const InvertedButtonBase = styled.button`
    background: white;
    color: ${props => props.theme.colour5};
    ${ButtonBase}
    border: 2px solid ${props => props.theme.colour5};
`

const FilledLinkBase = styled(Link)`
    background: ${props => props.theme.colour5};
    color: white !important;
    border: none;
    ${ButtonBase}
`

const InvertedLinkBase = styled(Link)`
    background: white;
    color: ${props => props.theme.colour5} !important;
    border: 2px solid ${props => props.theme.colour5};
    ${ButtonBase}
`

export const FilledButton = withTheme(FilledButtonBase)
export const InvertedButton = withTheme(InvertedButtonBase)
export const FilledLinkButton = withTheme(FilledLinkBase)
export const InvertedLinkButton = withTheme(InvertedLinkBase)