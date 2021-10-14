import React, { Component } from 'react'

class ShowDetails extends Component {
    render() {
        const show = this.props.ShowsList.filter(s => s.playback_id === this.props.location.pathname.split('/').pop())[0]
        if (!show)
            this.props.history.push('/dashboard')

        return (
            <div>
                <p>Stream Key: {show.stream_key}</p>
                <p>RTMP Server URL: rtmps://global-live.mux.com:443/app</p>
                <hr/>
                <p>Show Link: <a href={`/show/${show.playback_id}`}>{window.location.origin}/show/{show.playback_id}</a></p>
            </div>
        )
    }
}

export default ShowDetails