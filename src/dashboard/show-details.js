import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom"

class ShowDetails extends Component {
    constructor() {
        super()
        this.state = {
            show: {}
        }
    }
    setShow() {
        if (this.props.ShowsList.length === 0)
            this.props.history.push('/dashboard')

        const newShow = this.props.ShowsList.filter(s => s.playback_id === this.props.location.pathname.split('/').pop())[0]
        newShow !== this.state.show &&
            this.setState({
                show: newShow
            })
    }
    componentDidMount() {
        this.setShow()
    }
    componentDidUpdate() {
        this.setShow()
    }
    render() {
        return (
            <div className="show-details">
                <p>Stream Key: {this.state.show.stream_key}</p>
                <p>RTMP Server URL: rtmps://global-live.mux.com:443/app</p>
                <p>Show Link: <Link to={`/show/${this.state.show.playback_id}`}>{window.location.origin}/show/{this.state.show.playback_id}</Link></p>
            </div>
        )
    }
}

export default ShowDetails