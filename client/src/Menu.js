import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"
import './scss/menu.scss'

class Menu extends Component {
    render() {
        return (
            <div className='menu'>
                <a href='/'><img className="logo" src="/static/images/logo.png" alt="logo" /></a>
                <ul className="items">
                    <Link to="/" exact><li>Home</li></Link>
                    <Link to="/shows"><li>Shows</li></Link>
                    <Link to="/login" isActive={(m, l) => '/login' === l.pathname.toLowerCase() || '/register' === l.pathname.toLowerCase()}>
                        <li>Login / Register</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default  Menu