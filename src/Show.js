import React, { Component } from 'react'
import './scss/show.scss'

class Show extends Component {
    render() {
        return (
            <div className="show-container">
                <h1>{window.location.pathname}</h1>
            </div>
        )
    }
}

export default Show