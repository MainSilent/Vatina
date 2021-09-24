import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"
import Menu from './Menu'
import Home from './Home'
import Shows from './Shows'
import Account from './Account'
import NotFound from './404'
import Footer from './Footer'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Menu />
                    <Switch>
                        <Route path={["/login", "/register", "/resetpassword"]} component={Account} sensitive/>
                        <Route path="/shows" component={Shows}/>
                        <Route path='/' exact>
                            <Home />
                            <Footer />
                        </Route>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default  App