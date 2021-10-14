import React, { Component } from 'react'
import AuthContext from '../AuthContext'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            error: ''
        }
        this.changePassword = this.changePassword.bind(this)
    }
    async changePassword(e) {
        e.preventDefault()
        this.setState({ error: '' })

        const password = e.target.elements['password'].value
        const re_password = e.target.elements['re-password'].value

        if (!password || !re_password) {
            this.setState({
                error: 'Please fill out all required fields'
            })
            return
        }
        else if (password !== re_password) {
            this.setState({
                error: 'Password does not match'
            })
            return
        }

        try {
            const req = await fetch('/api/auth/change_password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.context.token
                },
                body: JSON.stringify({
                    new_password: password
                })
            })

            if (req.status === 204) {
                this.context.changeToken('')
                this.props.history.push('/login')
            } else {
                const res = await req.json()
                this.setState({
                    error: !res.detail ? `${Object.keys(res.message)[0].capitalizeTxt()} Error: ${res.message[Object.keys(res.message)[0]][0]}` : res.detail
                })
            }
        }
        catch (e) {
            console.log(e)
            this.setState({
                error: 'Network Error'
            })
        }
    }
    render() {
        return (
            <div className="settings">
                {this.state.error && <div className="error">{this.state.error}</div>}

                <div className="picture">
                    <p>Change</p>
                    <img src="/static/images/profile/James.jpeg" alt="Profile"/>
                </div>

                <form className="password" onSubmit={this.changePassword}>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="re-password" placeholder="Re-enter Password"/>
                    <input type="submit" value="Change"/>
                </form>
            </div>
        )
    }
}

Settings.contextType = AuthContext

export default Settings