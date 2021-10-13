import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"
import AuthContext from './AuthContext'
import Menu from './Menu'
import Home from './Home'
import Show from './Show'
import Shows from './Shows'
import Account from './Account'
import Dashboard from './Dashboard'
import NotFound from './404'
import Footer from './Footer'

class App extends Component {
    constructor() {
        super()
        this.state = {
            token: window.localStorage.getItem('token')
        }
        this.changeToken = this.changeToken.bind(this)
    }
    changeToken(token) {
        this.state.token !== token &&
            this.setState({ token: token })
    }
    render() {
        return (
            <AuthContext.Provider value={{ token: this.state.token, changeToken: this.changeToken }}>
                <Router>
                    <Menu />
                    <Switch>
                        <Route path={[process.env.PUBLIC_URL+"/login", process.env.PUBLIC_URL+"/register"]} component={Account} sensitive/>
                        <Route path={process.env.PUBLIC_URL+"/shows"} component={Shows} exact/>
                        <Route path={process.env.PUBLIC_URL+"/dashboard"} component={Dashboard}/>
                        <Route path={process.env.PUBLIC_URL+"/show"} component={Show} exact/>
                        <Route path={process.env.PUBLIC_URL+'/'} exact>
                            <Home />
                            <Footer />
                        </Route>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default  App