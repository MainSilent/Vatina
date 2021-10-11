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
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="re-password" placeholder="Re-enter Password"/>
                    <input type="submit" value="Change"/>
                </form>
            </div>
        )
    }
}

export default Settings