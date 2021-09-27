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
                {Array(100).fill().map((a, i) => 
                    <div className="show">
                        <h1>Cool {i}</h1>
                    </div>
                )}
            </div>
        )
    }
}

export default List