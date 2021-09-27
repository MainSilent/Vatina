import React, { Component } from 'react'
import TopBar from './shows/topbar'
import List from './shows/list'
import './scss/shows.scss'

class Shows extends Component {
    render() {
        return (
            <div className="shows">
                <TopBar />
                <List />
            </div>
        )
    }
}

export default  Shows