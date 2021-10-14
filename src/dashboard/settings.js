import React, { Component } from 'react'
import AuthContext from '../AuthContext'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            error: '',
            msg: ''
        }
        this.changePassword = this.changePassword.bind(this)
        this.changePicture = this.changePicture.bind(this)
    }
    async changePassword(e) {
        e.preventDefault()
        this.setState({ error: '', msg: '' })

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
    changePicture(e) {
        this.setState({ error: '', msg: '' })
        document.getElementById('picture').click()
        document.getElementById('picture').onchange = e => {
            this.setState({ msg: 'Uploading...' }, async () => {
                const file = new FormData()
                file.append('file', e.target.files[0])
                const req = await fetch('/api/auth/upload_avatar', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Token ' + this.context.token
                    },
                    body: file
                })
                
                if (req.status === 204) {
                    this.setState({ error: '', msg: '' })
                    this.loadProfile()
                }
                else {
                    this.setState({ error: 'Something went wrong, Try again later', msg: '' })
                }
            })
        }
    }
    loadProfile() {
        document.getElementById('profile-img').src = `/static/images/profile/${this.context.userId}.png?time=` + Date.now()
    }
    componentDidMount() {
        this.loadProfile()
    }
    render() {
        return (
            <div className="settings">
                {this.state.error && <div className="alert" style={{ color: 'red' }}>{this.state.error}</div>}
                {this.state.msg && <div className="alert" style={{ color: 'black' }}>{this.state.msg}</div>}

                <div className="picture" onClick={this.changePicture}>
                    <p>Change</p>
                    <input type="file" id="picture" style={{ display: 'none' }}/>
                    <img id='profile-img' alt="Profile"/>
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