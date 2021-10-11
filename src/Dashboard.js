import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import './scss/dashboard.scss'

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="navbar">
                    <ul className="show-list">

                    </ul>

                    <div className="add-show"><FontAwesomeIcon icon={faPlus} /> Add Show</div>

                    <div className="settings"><FontAwesomeIcon icon={faCog} /> Settings</div>

                    <div className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</div>
                </div>

                <div className="content">

                </div>
            </div>
        )
    }
}

export default Dashboard