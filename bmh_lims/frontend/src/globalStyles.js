import { createGlobalStyle } from 'styled-components'

// Styles for the entire app. This is injected in the App component.

export const GlobalStyle = createGlobalStyle`
    * {
        text-decoration: none;
    }
    body {
        font-family: 'Assistant', sans-serif;
    }
    h1 {
        font-size: 3rem;
        margin: 0;
    }
    h2 {
        font-size: 2rem;
    }
    p {
        font-size: 1rem;
        padding: 0;
        margin: 0;
    }
    a: visited {
        color: black;
    }
`

export const theme = {
    primarybg: 'rgb(0, 180, 200)',
    primaryfg: 'white',
    secondarybg: 'rgb(10, 60, 90)',
    colour1: '#676E79',
    colour2: '#0C2242',
    colour3: '#426E88',
    colour4: '#6899B6',
    colour5: '#ED7D3A',
    colour6: '#b13434',
}
