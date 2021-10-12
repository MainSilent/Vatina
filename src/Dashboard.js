import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Route, Redirect } from "react-router-dom"
import AddShow from './dashboard/add-show'
import Settings from './dashboard/settings'
import './scss/dashboard.scss'

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="navbar">
                    <div className="show-list">
                        <a href="#test">Adobe</a>
                        <a href="#test">Google</a>
                        <a href="#test">Microsoft</a>
                        <Link to={process.env.PUBLIC_URL+"/dashboard/addshow"} className="add-show"><FontAwesomeIcon icon={faPlus} /> Add Show</Link>
                    </div>

                    <div className="actions">
                        <Link to={process.env.PUBLIC_URL+"/dashboard/settings"} className="settings"><FontAwesomeIcon icon={faCog} /> Settings</Link>
                        <Link to={process.env.PUBLIC_URL+"/dashboard/logout"} className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                    </div>
                </div>

                <div className="content">
                    <Route path={process.env.PUBLIC_URL+"/dashboard/"} exact>
                        <Redirect to={process.env.PUBLIC_URL+"/dashboard/addshow"} />
                    </Route>
                    <Route path={[process.env.PUBLIC_URL+"/dashboard/addshow", process.env.PUBLIC_URL+"/dashboard/"]} component={AddShow} exact/>
                    <Route path={process.env.PUBLIC_URL+"/dashboard/settings"} component={Settings} exact/>
                </div>
            </div>
        )
    }
}

export default Dashboard