import React, { Component } from 'react'
import AuthContext from '../AuthContext'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            isSubmit: false,
            error: '',
            msg: ''
        }
        this.changePassword = this.changePassword.bind(this)
        this.changePicture = this.changePicture.bind(this)
    }
    async changePassword(e) {
        e.preventDefault()
        if (this.state.isSubmit) return
        this.setState({ error: '', msg: '', isSubmit: true })

        const password = e.target.elements['password'].value
        const re_password = e.target.elements['re-password'].value

        if (!password || !re_password) {
            this.setState({
                isSubmit: false,
                error: 'Please fill out all required fields'
            })
            return
        }
        else if (password !== re_password) {
            this.setState({
                isSubmit: false,
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
                this.setState({
                    isSubmit: false
                })
            } else {
                const res = await req.json()
                this.setState({
                    isSubmit: false,
                    error: !res.detail ? `${Object.keys(res.message)[0].capitalizeTxt()} Error: ${res.message[Object.keys(res.message)[0]][0]}` : res.detail
                })
            }
        }
        catch (e) {
            console.log(e)
            this.setState({
                isSubmit: false,
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
                    try {
                        const res = await req.json()
                        this.setState({
                            error: !res.error ? `${Object.keys(res.message)[0].capitalizeTxt()} Error: ${res.message[Object.keys(res.message)[0]][0]}` : res.error,
                            msg: ''
                        })
                    } catch(e) {
                        this.setState({
                            error: 'Something went wrong, Try again later',
                            msg: ''
                        })
                    }
                }
            })
        }
    }
    loadProfile() {
        const img = document.getElementById('profile-img')
        img.src = `/static/images/profile/${this.context.userId}.png?time=` + Date.now()
        img.onerror = e => {
            img.src = `/static/images/profile/Guest.png?time=` + Date.now()
        }
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
                    <button type="submit">{this.state.isSubmit ? <div className="loader"></div> : 'Change'}</button>
                </form>
            </div>
        )
    }
}

Settings.contextType = AuthContext

export default Settings