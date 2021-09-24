import React, { Component } from 'react'
import TopBar from './shows/topbar'
import './scss/shows.scss'

class Shows extends Component {
    render() {
        return (
            <div className="shows">
                <TopBar />
            </div>
        )
    }
}

export default  Shows