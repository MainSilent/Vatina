import React, { Component } from 'react'

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px',
    fontFamily: 'arial',
    width: '100vw',
    height: '70vh'
}

class NotFound extends Component {
    render() {
        return (
            <div style={styles}>
                <p>404 - Page Not Found</p>
            </div>
        )
    }
}

export default NotFound