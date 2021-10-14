import React, { Component } from 'react'

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
            <div>
                <p>Stream Key: {this.state.show.stream_key}</p>
                <p>RTMP Server URL: rtmps://global-live.mux.com:443/app</p>
                <hr/>
                <p>Show Link: <a href={`/show/${this.state.show.playback_id}`}>{window.location.origin}/show/{this.state.show.playback_id}</a></p>
            </div>
        )
    }
}

export default ShowDetails