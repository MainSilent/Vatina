import React, { Component } from 'react'
import Intro from './home/intro'
import Features from './home/features'
import './scss/home.scss'

class Home extends Component {
    componentDidMount() {
        window.onload = () => {
            setTimeout(() => {
                window.scrollTo({ left: 0 })
            }, 0)
        }
    }
    render() {
        return (
            <div className='home'>
                <Intro />
                <Features />
            </div>
        )
    }
}

export default Home