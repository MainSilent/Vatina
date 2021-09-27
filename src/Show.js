import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import './scss/show.scss'

class Show extends Component {
    render() {
        const i = window.location.pathname.split('').pop()
        if (isNaN(i) || i < 1 || i > 5)
            this.props.history.push("/404")

        return (
            <div className="show-container">
                <div className="host-container"></div>
                <div className="product-container"></div>
                <div className="video-container"></div>
                <div className="comments-container"></div>
            </div>
        )
    }
}

export default withRouter(Show)