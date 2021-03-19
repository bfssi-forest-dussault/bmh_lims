import React from 'react'
import { CircularButton, CircularButtonContainer, DecorativeBar } from './Styles'

const CircularButtonBar = (page, setPage) => {
    const pageHandler =  (page,e) => {
         setPage(e);
        console.log(page)
    };
    return (
        <CircularButtonContainer>
            <CircularButton onClick={(e) => {pageHandler('Assign')}}>Assign</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('execute')}}>Execute</CircularButton>
            <DecorativeBar />
            <CircularButton onClick={(e) => {console.log('enter results')}}>Enter Results</CircularButton>
        </CircularButtonContainer>
    )
}

export default CircularButtonBar
