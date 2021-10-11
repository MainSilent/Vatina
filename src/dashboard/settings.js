import React, { Component } from 'react'

class Settings extends Component {
    render() {
        return (
            <div className="settings">
                <div className="picture">
                    <p>Change</p>
                    <img src="/Vatina/static/images/profile/James.jpeg" alt="Profile"/>
                </div>

                <form className="password">
                    <input type="text"/>
                    <input type="text"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Settings