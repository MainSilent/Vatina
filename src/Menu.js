import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import AuthContext from './AuthContext'
import './scss/menu.scss'

function Items(props) {
    const showRoutes = ["/shows", "/show"]
    const accountRoutes = ["/login", "/register", "/dashboard"]
    return (
        <>
            <Link to={process.env.PUBLIC_URL+"/"} exact>
                <li>Home</li>
            </Link>
            <Link to={process.env.PUBLIC_URL+"/shows"} isActive={(m, l) => showRoutes.map(r => l.pathname.startsWith(process.env.PUBLIC_URL+r)).includes(true)}>
                <li>Shows</li>
            </Link>
            <Link to={process.env.PUBLIC_URL+`${props.isAuth ? '/dashboard' : '/login'}`} isActive={(m, l) => accountRoutes.map(r => l.pathname.startsWith(process.env.PUBLIC_URL+r)).includes(true)}>
                <li>{props.isAuth ? 'Dashboard' : 'Login / Register'}</li>
            </Link>
        </>
    )
}

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    render() {
        return (
            <div className='menu'>
                <a href={process.env.PUBLIC_URL+'/'}><img className="logo" src={process.env.PUBLIC_URL+"/static/images/logo.png"} alt="logo" /></a>
                <ul className="items">
                    <Items isAuth={!!this.context.token}/>
                </ul>
                {/* Responsive Menu */}
                <span className="hamberger-btn" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>&#9776;</span>
                <ul className="items-rwd" style={this.state.isOpen ? { width: document.body.clientWidth >= 350 ? '300px' : '100%'} : {}}>
                    <span className="closebtn" onClick={() => this.setState({ isOpen: false })}>&times;</span>
                    <Items isAuth={!!this.context.token}/>
                </ul>
            </div>
        )
    }
}

Menu.contextType = AuthContext

export default  Menu