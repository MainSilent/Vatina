import React, { Component } from 'react'

class Intro extends Component {
    render() {
        return (
            <div className='intro-container' style={{'backgroundImage': `url(${process.env.PUBLIC_URL}/static/images/intro.jpg)`}}>
                <div className='intro'>
                    <h1>
                        Introduce The Future &<br/>Increase Your Product Sales
                    </h1>
                    <img className='demo' alt='demo' src={process.env.PUBLIC_URL+"/static/images/demo.png"}/>
                </div>
                <div className="crop"></div>
            </div>
        )
    }
}

export default  Intro