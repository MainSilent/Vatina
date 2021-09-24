import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import validator from 'validator'
import Login from './account/login'
import Register from './account/register'
import ResetPassword from './account/resetpassword'
import './scss/account.scss'

class Account extends Component {
    constructor() {
        super()
        this.state = {
            isSubmit: false,
            success: '',
            error: '',
            path: window.location.pathname
        }
        this.submit = this.submit.bind(this)
    }
    isStrongPassword(password) {
        if (!validator.isStrongPassword(password.value, { minSymbols: 0 })) {
            if (password.value.length < 8) {
                this.setInvalid('Please provide a stronger password with length of at least 8', [password])
                return
            }
            else if (!/\d/.test(password.value)) {
                this.setInvalid('Please provide a stronger password with at least one Number', [password])
                return
            }
            else if (!/[a-z]/.test(password.value)) {
                this.setInvalid('Please provide a stronger password with at least one LowerCase character', [password])
                return
            }
            else if (!/[A-Z]/.test(password.value)) {
                this.setInvalid('Please provide a stronger password with at least one UpperCase character', [password])
                return
            }
        }
    }
    submit() {
        if (this.state.isSubmit)
            return

        this.setState({ 
            isSubmit: true,
            error: ''
        })
        document.querySelector('.submit').classList.remove('error')
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('invalid'))

        const email = document.getElementById('email')
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const re_password = document.getElementById('re_password')
        const is_brand = document.getElementById('is_brand')
        const brand_name = document.getElementById('brand_name')

        if (this.state.path === '/login') {
            if (!email.value || !password.value) {
                this.setInvalid('Empty Login Credentials', [!email.value && email, !password.value && password])
                return
            }
            if (!validator.isEmail(email.value)) {
                this.setInvalid('Invalid email format', [email])
                return
            }
        }
        else if (this.state.path === '/register') {
            if (!email.value || !username.value || !password.value || !re_password.value || (!is_brand && !brand_name.value)) {
                this.setInvalid('Empty Registration Data', [
                    !email.value && email,
                    !username.value && username,
                    !password.value && password,
                    !re_password.value && re_password,
                    !is_brand && !brand_name.value && brand_name
                ])
                return
            }
            if (!validator.isEmail(email.value)) {
                this.setInvalid('Invalid email format', [email])
                return
            }
            if (username.value.length < 3) {
                this.setInvalid('Username is shorter than length of 3', [username])
                return
            }
            if (password.value !== re_password.value) {
                this.setInvalid('Password does not match', [re_password])
                return
            }
            if (!this.isStrongPassword(password))
                return
        }
        else if (this.state.path === '/resetpassword') {
            if (password.value !== re_password.value) {
                this.setInvalid('Password does not match', [re_password])
                return
            }
            if (!this.isStrongPassword(password))
                return
        }
    }
    setInvalid(msg, elems) {
        this.setState({ 
            isSubmit: false,
            error: msg
        })
        document.querySelector('.submit').classList.add('error')
        elems.forEach(elem => elem && elem.classList.add('invalid'))
    }
    componentDidUpdate() {
        if (this.state.path !== window.location.pathname) {
            if (this.state.isSubmit)
                this.props.history.push(this.state.path) 
            else {
                this.setState({ 
                    isSubmit: false,
                    success: '',
                    error: '',
                    path: window.location.pathname
                })
            }
        }
    }
    render() {
        let path = this.state.path.split('/')[1]
        return (
            <div className="login-register">
                {path !== 'resetpassword' &&
                <div className="nav">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                }

                <div className="form">
                    {this.state.error && <p className="error">{this.state.error}</p>}
                    {this.state.success && <p className="success">{this.state.success}</p>}
                    {
                        path === 'login' ? 
                            <Login forgetPassword={this.forgetPassword} submit={this.submit} isSubmit={this.state.isSubmit}/> : 
                        path === 'register' ? 
                            <Register submit={this.submit} isSubmit={this.state.isSubmit}/> :
                        path === 'resetpassword' ? 
                            <ResetPassword submit={this.submit} isSubmit={this.state.isSubmit}/> : null
                    }
                </div>

                <div className={`submit ${this.state.error ? 'error' : ''}`} onClick={this.submit}>
                    {
                        !this.state.isSubmit ? 
                            <p>{path !== 'resetpassword' ? path[0].toUpperCase() + path.slice(1).toLowerCase() : "Change"}</p> :
                            <div className="loader"></div>
                    }  
                </div>
            </div>
        )
    }
}

export default Account