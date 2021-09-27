import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/fontawesome-free-solid'

class List extends Component {
    componentDidMount() {
        const list = document.querySelector(".list");

        list.addEventListener("wheel", e => {
            list.scrollLeft += e.deltaY
        })
    }
    render() {
        return (
            <div className="list">
                {Array(50).fill().map((a, i) => 
                    <div className="show" key={i}>
                        <img className="thumbnail" alt={`Sample ${i}`} src={`./static/sample/sample${Math.floor(Math.random() * (6 - 1) + 1)}.png`}/>
                        <div className="details">
                            <h2 className="title">Sample {++i}</h2>
                            <p className="views">{Math.floor(Math.random() * (100 - 10) + 10)} <FontAwesomeIcon icon={faEye} /></p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default List