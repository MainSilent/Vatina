import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Route, Redirect } from "react-router-dom"
import AuthContext from './AuthContext'
import AddShow from './dashboard/add-show'
import ShowDetails from './dashboard/show-details'
import Settings from './dashboard/settings'
import './scss/dashboard.scss'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            ShowsList: []
        }
        this.fetchShows = this.fetchShows.bind(this)
        this.deleteShow = this.deleteShow.bind(this)
    }
    async Logout() {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + this.context.token
            }
        })
        this.context.changeToken('')
        this.context.changeUserID('')
        this.props.history.push('/login')
    }
    async fetchShows() {
        await fetch('/api/show/', {
            headers: {
                Authorization: 'Token ' + this.context.token
            }
        })
        .then(res => res.json())
        .then(res => this.setState({ ShowsList: res }))
    }
    async componentDidMount() {
        await this.fetchShows()

        !this.context.token &&
            this.props.history.push('/login')
    }
    async deleteShow(id) {
        await fetch('/api/show/'+id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + this.context.token
            }
        })
        this.props.history.push('/dashboard')
        await this.fetchShows()
    }
    render() {
        return (
            <div className="dashboard">
                <div className="navbar">
                    <div className="show-list">
                        {this.state.ShowsList.map((show, i) => 
                            <Link key={i} to={process.env.PUBLIC_URL+"/dashboard/show/"+show.playback_id}>{show.title}</Link>
                        )}
                        <Link to={process.env.PUBLIC_URL+"/dashboard/addshow"} className="add-show"><FontAwesomeIcon icon={faPlus} /> Add Show</Link>
                    </div>

                    <div className="actions">
                        <Link to={process.env.PUBLIC_URL+"/dashboard/settings"} className="settings"><FontAwesomeIcon icon={faCog} /> Settings</Link>
                        {/* eslint-disable-next-line */}
                        <a className="logout" href="#" onClick={() => this.Logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a>
                    </div>
                </div>

                <div className="content">
                    <Route path={process.env.PUBLIC_URL+"/dashboard/"} exact>
                        <Redirect to={process.env.PUBLIC_URL+"/dashboard/addshow"} />
                    </Route>
                    <Route path={[process.env.PUBLIC_URL+"/dashboard/addshow", process.env.PUBLIC_URL+"/dashboard/"]} exact><AddShow { ...this.props } fetchShows={this.fetchShows}/></Route>
                    <Route path={process.env.PUBLIC_URL+"/dashboard/show"}><ShowDetails { ...this.props } ShowsList={this.state.ShowsList} deleteShow={this.deleteShow}/></Route>
                    <Route path={process.env.PUBLIC_URL+"/dashboard/settings"} component={Settings} exact/>
                </div>
            </div>
        )
    }
}

Dashboard.contextType = AuthContext

export default Dashboard