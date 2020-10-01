
import { Link } from 'react-router-dom'
import styled, { css, withTheme } from 'styled-components'

const ButtonBase = css`
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 5px;
`

const FilledButtonBase = styled.button`
    background: ${props => props.theme.primarybg};
    color: ${props => props.theme.primaryfg};
    border: none;
    ${ButtonBase}
`

const InvertedButtonBase = styled.button`
    background: ${props => props.theme.primaryfg};
    color: ${props => props.theme.primarybg};
    ${ButtonBase}
    border: 2px solid ${props => props.theme.primaryfg};
`

const FilledLinkBase = styled(Link)`
    background: ${props => props.theme.primarybg};
    color: ${props => props.theme.primaryfg} !important;
    border: none;
    ${ButtonBase}
`

const InvertedLinkBase = styled(Link)`
    background: ${props => props.theme.primaryfg};
    color: ${props => props.theme.primarybg} !important;
    border: 2px solid ${props => props.theme.primarybg};
    ${ButtonBase}
`

export const FilledButton = withTheme(FilledButtonBase)
export const InvertedButton = withTheme(InvertedButtonBase)
export const FilledLinkButton = withTheme(FilledLinkBase)
export const InvertedLinkButton = withTheme(InvertedLinkBase)