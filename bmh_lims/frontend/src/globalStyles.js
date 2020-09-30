import { createGlobalStyle } from 'styled-components'

// Styles for the entire app. This is injected in the App component.

export const GlobalStyle = createGlobalStyle`
    * {
        text-decoration: none;
        color: black;
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
        font-size: 1.5rem;
    }
    a: visited {
        color: black;
    }
`