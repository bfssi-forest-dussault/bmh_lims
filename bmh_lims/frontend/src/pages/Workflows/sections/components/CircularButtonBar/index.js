import React from 'react'
import { CircularButton, CircularButtonContainer, DecorativeBar } from './Styles'

const CircularButtonBar = (page, setPage, pageHandler) => {
    // const pageHandler = (pageName) => {
    //     setPage(pageName)
    // }
    return (
        <CircularButtonContainer>
            <CircularButton onClick={() => {pageHandler("Hello")}}>Assign</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('execute')}}>Execute</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('enter results')}}>Enter Results</CircularButton>
        </CircularButtonContainer>
    )
}

export default CircularButtonBar
