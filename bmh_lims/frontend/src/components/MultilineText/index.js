import React from 'react'
import { IndentedLine } from './Styles'

export const MultilineText = ({text}) => {
    const pixelsPerTab = 20
    const lines = text.split('\n')
    return (
        lines.map((line, idx) => {
            let numTabs = 0
            while (line.charAt(numTabs++) === '\t') {}
            return (
                <IndentedLine key={`line-${idx}`} numSpaces={numTabs * pixelsPerTab}>{line}</IndentedLine>
            )})
    )
}