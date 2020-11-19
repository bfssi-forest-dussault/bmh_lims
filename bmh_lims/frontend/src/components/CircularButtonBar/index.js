import React from 'react'
import { CircularButton, CircularButtonContainer, DecorativeBar } from './Styles'

const CircularButtonBar = () => {
    return (
        <CircularButtonContainer>
            <CircularButton onClick={(e) => {console.log('assign')}}>assign</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('execute')}}>execute</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('enter results')}}>enter results</CircularButton>
        </CircularButtonContainer>
    )
}

export default CircularButtonBar