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
            userId: window.localStorage.getItem('userId'),
            token: window.localStorage.getItem('token')
        }
        this.changeToken = this.changeToken.bind(this)
        this.changeUserID = this.changeUserID.bind(this)
    }
    changeToken(token) {
        this.state.token !== token &&
            this.setState({ token: token }, () => {
                if (!token)
                    window.localStorage.removeItem('token')
                else
                    window.localStorage.setItem('token', token)
            })
    }
    changeUserID(userId) {
        this.state.userId !== userId &&
            this.setState({ userId: userId }, () => {
                if (!userId)
                    window.localStorage.removeItem('userId')
                else
                    window.localStorage.setItem('userId', userId)
            })
    }
    render() {
        return (
            <AuthContext.Provider value={{ userId: this.state.userId, token: this.state.token, changeToken: this.changeToken, changeUserID: this.changeUserID }}>
                <Router>
                    <Menu />
                    <Switch>
                        <Route path={[process.env.PUBLIC_URL+"/login", process.env.PUBLIC_URL+"/register"]} component={Account} sensitive/>
                        <Route path={process.env.PUBLIC_URL+"/shows"} component={Shows} exact/>
                        <Route path={process.env.PUBLIC_URL+"/dashboard"} component={Dashboard}/>
                        <Route path={process.env.PUBLIC_URL+"/show"} component={Show}/>
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