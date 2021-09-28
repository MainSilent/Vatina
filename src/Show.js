import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faVolumeUp } from '@fortawesome/fontawesome-free-solid'
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import './scss/show.scss'

class Show extends Component {
    constructor() {
        super()
        this.state = {
            muted: true
        }
    }
    render() {
        return (
            <div className="show-container">
                <div className="host-container">
                    <img src='/static/images/adobe.jpg' alt="adobe logo"/>
                    <h1>Adobe<span><br/>Live show started: 8:53 AM</span></h1>
                </div>

                <div className="line"/>

                <div className="product-container">
                    <div className="info">
                        <p className="name"><img src='/static/images/AdobeXD.png' alt="Adobe XD" /> Adobe XD Beta</p>
                        <p className="description">This product is a vector-based user experience design tool for web apps and mobile apps.</p>
                    </div>
                    <p className="price"></p>
                </div>

                <div className="comments-container">
                    <p className="views">27 <FontAwesomeIcon icon={faEye} /></p>
                </div>

                <div className="video-container">
                    <video autoPlay muted={this.state.muted}>
                        <source src="/static/AdobeXD.webm" type="video/webm" width="100%" height="auto"/>
                    </video>
                    <span className="mute" onClick={() => this.setState({ muted: !this.state.muted })}><FontAwesomeIcon icon={this.state.muted ? faVolumeMute : faVolumeUp} /></span>
                </div>
            </div>
        )
    }
}

export default Show