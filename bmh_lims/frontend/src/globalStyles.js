import { createGlobalStyle } from 'styled-components'

// Styles for the entire app. This is injected in the App component.

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Assistant', sans-serif;
    }
    h1 {
        font-size: 3em;
        margin: 0;
    }
    h2 {
        font-size: 2em;
    }
    p {
        font-size: 1.5em;
    }
`