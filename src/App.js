import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"
import Menu from './Menu'
import Home from './Home'
import Show from './Show'
import Shows from './Shows'
import Account from './Account'
import Dashboard from './Dashboard'
import NotFound from './404'
import Footer from './Footer'

class App extends Component {
    render() {
        return (
            <Router>
                <Menu />
                <Switch>
                    <Route path={[process.env.PUBLIC_URL+"/login", process.env.PUBLIC_URL+"/register"]} component={Account} sensitive/>
                    <Route path={process.env.PUBLIC_URL+"/shows"} component={Shows} exact/>
                    <Route path={process.env.PUBLIC_URL+"/dashboard"} component={Dashboard} exact/>
                    <Route path={process.env.PUBLIC_URL+"/show"} component={Show} exact/>
                    <Route path={process.env.PUBLIC_URL+'/'} exact>
                        <Home />
                        <Footer />
                    </Route>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default  App