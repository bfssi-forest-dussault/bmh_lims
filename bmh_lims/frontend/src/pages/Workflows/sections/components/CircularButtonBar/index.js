import React from 'react'
import { CircularButton, CircularButtonContainer, DecorativeBar } from './Styles'

const CircularButtonBar = () => {
    return (
        <CircularButtonContainer>
            <CircularButton onClick={(e) => {console.log('assign')}}>Assign</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('execute')}}>Execute</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('enter results')}}>Enter Results</CircularButton>
        </CircularButtonContainer>
    )
}

export default CircularButtonBar
