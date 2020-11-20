import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyle } from 'styles'
import "regenerator-runtime/runtime.js"

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import LuxonUtils from '@date-io/luxon'

import { HomePage, UploadSamplesPage, WorkflowsPage } from 'pages'


const App = () => {
    return (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
            <div>
                <GlobalStyle />
                <Switch>
                    <Route path='/lims' component={ HomePage } />
                    <Route path='/upload' component={ UploadSamplesPage } />
                    <Route path='/workflows' component={ WorkflowsPage } />
                </Switch>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default App
