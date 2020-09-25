import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyle } from './globalStyles'
import "regenerator-runtime/runtime.js"

import { HomePage, UploadSamplesPage } from 'pages'


const App = () => {
    return (
        <div>
            <GlobalStyle />
            <Switch>
                <Route path='/lims' component={ HomePage } />
                <Route path='/upload' component={ UploadSamplesPage } />
            </Switch>
        </div>
    )
}

export default App
