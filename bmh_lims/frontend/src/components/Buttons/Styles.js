
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css, withTheme } from 'styled-components'

const ButtonBase = css`
    font-size: 1em;
    border-radius: 5px;
    min-height: 40px;
    width: ${props => props.width || '100px'};
    margin: 0 2px 0 2px;
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
    text-align: center;
    line-height: 40px;
    ${ButtonBase}
`

const LinkText = styled.span`
    display: inline;
    //vertical-align: middle;
`

export const FilledLinkButton = withTheme(({to, ...props}) =>
    <FilledLinkBase to={to}>
        <LinkText>
            {props.children}
        </LinkText>
    </FilledLinkBase>
)

const InvertedLinkBase = styled(Link)`
    background: white;
    color: ${props => props.theme.colour5} !important;
    border: 2px solid ${props => props.theme.colour5};
    text-align: center;
    line-height: 40px;
    ${ButtonBase}
`

export const InvertedLinkButton = withTheme(({to, ...props}) =>
    <InvertedLinkBase to={to}>
        <LinkText>
            {props.children}
        </LinkText>
    </InvertedLinkBase>
)

export const FilledButton = withTheme(FilledButtonBase)
export const InvertedButton = withTheme(InvertedButtonBase)
