import React, { Component } from 'react'

class Show extends Component {
    render() {
        return (
            <div>
                <h1>{window.location.pathname}</h1>
            </div>
        )
    }
}

export default Show