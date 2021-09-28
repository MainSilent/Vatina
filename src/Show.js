import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/fontawesome-free-solid'
import './scss/show.scss'

class Show extends Component {
    render() {
        return (
            <div className="show-container">
                <div className="host-container">
                    <img src='/static/images/adobe.jpg' alt="adobe logo"/>
                    <h1>Adobe<span><br/>Live show started: 8:53 AM</span></h1>
                    {/* <p className="views">27 <FontAwesomeIcon icon={faEye} /></p> */}
                </div>

                <div className="product-container"></div>
                <div className="video-container"></div>
                <div className="comments-container"></div>
            </div>
        )
    }
}

export default Show