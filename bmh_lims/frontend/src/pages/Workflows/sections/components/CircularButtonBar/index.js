import React from 'react'
import { CircularButton, CircularButtonContainer, DecorativeBar } from './Styles'

const CircularButtonBar = () => {
    return (
        <CircularButtonContainer>
            {/*<CircularButton onClick={(e) => {console.log('assign')}}>Assign</CircularButton>*/}
            <CircularButton to={'/workflows'}>Assign</CircularButton>

            <DecorativeBar />
            <CircularButton to={'/workflows'}>Execute</CircularButton>
            <DecorativeBar />
            <CircularButton to={'/workflows'}>Enter Results</CircularButton>
        </CircularButtonContainer>
    )
}

export default CircularButtonBar
