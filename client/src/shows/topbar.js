import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

class TopBar extends Component {
    constructor() {
        super()
        this.state = {
            inSearch: false,
            search: '',
            ended: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({ 
            search: event.target.value
        })
    }
    render() {
        return (
            <div className={`topbar${this.state.inSearch ? ' disable' : ''}`}>
                <ul className="sort">
                    <li className="active">Newest</li>
                    <li>Oldest</li>
                    <li>Most Views</li>
                    <li>Least Views</li>

                    <li onClick={() => this.setState({ ended: !this.state.ended })}>
                        <span>Ended</span>
                        <label className="switch">
                            <input type="checkbox" name="ended" checked={this.state.ended} onChange={() => this.setState({ ended: this.state.ended })}/>
                            <span className="slider round" />
                        </label>
                    </li>
                </ul>

                <div className="search">
                    <button><FontAwesomeIcon icon={faSearch}/></button>
                    <input value={this.state.search} onChange={this.handleChange} type="text" name="search" id="search" placeholder="Search..."/>
                </div>
            </div>
        )
    }
}

export default TopBar