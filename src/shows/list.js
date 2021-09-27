import React, { Component } from 'react'

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
                    <div className="show">
                        <img className="thumbnail" src={`./static/sample/sample${Math.floor(Math.random() * (6 - 1) + 1)}.png`}/>
                        <div className="details">
                            <h2 className="title">Sample {i}</h2>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default List