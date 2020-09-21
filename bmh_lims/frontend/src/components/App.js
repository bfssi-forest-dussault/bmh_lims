import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { HomePage } from '../pages'

const App = () => {
    return (
        <Switch>
            <Route path='/lims' component={ HomePage } />
        </Switch>
    )
}

export default App
