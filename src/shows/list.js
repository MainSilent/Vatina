import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/fontawesome-free-solid'

class List extends Component {
    render() {
        return (
            <div className="list">
                {Array(5).fill().map((_, i) => 
                    <div className="show" key={i} onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/show`)}>
                        <img className="thumbnail" alt={`Sample ${++i}`} src={`${process.env.PUBLIC_URL}/static/images/sample${i}.png`}/>
                        <div className="details">
                            <h2 className="title">Sample {i}</h2>
                            <p className="views">{Math.floor(Math.random() * (100 - 10) + 10)} <FontAwesomeIcon icon={faEye} /></p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(List)