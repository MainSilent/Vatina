import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import './scss/menu.scss'

function Items() {
    return (
        <>
            <Link to={process.env.PUBLIC_URL+"/"} exact><li>Home</li></Link>
            <Link to={process.env.PUBLIC_URL+"/shows"} isActive={(m, l) => l.pathname.startsWith(process.env.PUBLIC_URL+'/shows') || l.pathname.startsWith(process.env.PUBLIC_URL+'/show')}><li>Shows</li></Link>
            <Link to={process.env.PUBLIC_URL+"/login"} isActive={(m, l) => l.pathname.startsWith(process.env.PUBLIC_URL+'/login') || l.pathname.startsWith(process.env.PUBLIC_URL+'/register') || l.pathname.startsWith(process.env.PUBLIC_URL+'/dashboard')}>
                <li>Login / Register</li>
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
                    <Items />
                </ul>
                {/* Responsive Menu */}
                <span className="hamberger-btn" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>&#9776;</span>
                <ul className="items-rwd" style={this.state.isOpen ? { width: document.body.clientWidth >= 350 ? '300px' : '100%'} : {}}>
                    <span className="closebtn" onClick={() => this.setState({ isOpen: false })}>&times;</span>
                    <Items />
                </ul>
            </div>
        )
    }
}

export default  Menu