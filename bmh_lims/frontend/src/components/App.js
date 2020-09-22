import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyle } from '../globalStyles'

import { HomePage } from '../pages'

const App = () => {
    return (
        <div>
            <GlobalStyle />
            <Switch>
                <Route path='/lims' component={ HomePage } />
            </Switch>
        </div>
    )
}

export default App
