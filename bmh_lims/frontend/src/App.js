import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyle } from 'styles'
import "regenerator-runtime/runtime.js"

import { HomePage, UploadSamplesPage, WorkflowsPage } from 'pages'


const App = () => {
    return (
        <div>
            <GlobalStyle />
            <Switch>
                <Route path='/lims' component={ HomePage } />
                <Route path='/upload' component={ UploadSamplesPage } />
                <Route path='/workflows' component={ WorkflowsPage } />
            </Switch>
        </div>
    )
}

export default App
