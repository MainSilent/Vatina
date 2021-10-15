import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faVolumeUp, faComment } from '@fortawesome/fontawesome-free-solid'
import { faVolumeMute, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import randomComments from './random_comments.json'
import Hls from 'hls.js'
import './scss/show.scss'

class Show extends Component {
    constructor() {
        super()
        this.state = {
            isLive: false,
            isLoading: true,
            scrolled: false,
            muted: true,
            showComments: true,
            users: ['Benjamin', 'James', 'Oliver', 'Patricia', 'Charles'],
            comment: '',
            comments: [],
            show: {}
        }
        this.handleComment = this.handleComment.bind(this)
        this.addComment = this.addComment.bind(this)
    }
    scrollBottom() {
        if (!this.state.showComments) return
        const elem = document.querySelector('.comments')
        elem.scrollTop = elem.scrollHeight - elem.clientHeight
    }
    handleComment(event) {
        this.setState({ 
            comment: event.target.value
        })
    }
    addComment() {
        this.state.comment && 
            this.setState({
                comments: [
                    ...this.state.comments,
                    {
                        name: "Guest",
                        text: this.state.comment
                    }
                ],
                comment: ''
            }, this.scrollBottom)
    }
    generateComment() {
        setTimeout(() => {
            this.setState({
                comments: [
                    ...this.state.comments,
                    {
                        name: this.state.users[Math.floor(Math.random() * 5)],
                        text: randomComments[Math.floor(Math.random() * 10)]
                    }
                ]
            }, () => !this.state.scrolled && this.scrollBottom())
            this.generateComment()
        }, Math.floor(Math.random() * (7 - 1) + 1) * 1000)
    }
    checkScroll() {
        const comments = document.querySelector('.comments')
        comments.addEventListener('scroll', event => {
            if (comments.clientHeight + comments.scrollTop >= comments.scrollHeight - 5)
                this.state.scrolled &&
                    this.setState({
                        scrolled: false
                    })  
            else
                !this.state.scrolled &&
                    this.setState({
                        scrolled: true
                    })
        })
    }
    async componentDidMount() {
        // Get show data
        const playback_id = this.props.location.pathname.split('/').pop()
        const req = await fetch('/api/show/'+playback_id)
        if (req.status === 200) {
            const res = await req.json()
            this.setState({
                show: res,
                isLive: true,
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: false
            })
        }

        if (document.documentElement.clientWidth <= 800)
            this.setState({
                showComments: false
            })
        
        // this.checkScroll()
        this.generateComment()

        // Load profile picture
        const profilePicture = document.querySelector('.profile-picture')
        if (this.state.isLive) {
            profilePicture.src = `/static/images/profile/${this.state.show.owner_id}.png?time=` + Date.now()
            profilePicture.onerror = e => {
                profilePicture.src = `/static/images/profile/Guest.png?time=` + Date.now()
            }
        } else {
            profilePicture.src = process.env.PUBLIC_URL+'/static/images/adobe.jpg'
        }

        // Load video
        if (this.state.isLive) {
            const video = document.getElementById('live-show')
            const src = `https://stream.mux.com/${this.state.show.playback_id}.m3u8`

            if (Hls.isSupported()) {
                const hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
            } else {
                console.error("This is a legacy browser that doesn't support MSE")
            }
        }
    }
    componentDidUpdate() {
        this.state.showComments && !this.state.scrolled &&
            this.checkScroll()
    }
    render() {
        const show = this.state.show
        const isLive = this.state.isLive
        
        return (
            this.state.isLoading ? <div className="show-loader-container"><div className="loader"></div></div> :
            <div className="show-container">
                <div className="host-container">
                    <img className="profile-picture" alt="logo"/>
                    <h1>{isLive ? show.username : 'Adobe'}<span><br/>Live show started: {isLive ? new Date(show.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) : '8:53 AM'}</span></h1>
                    <p className="views">83 <FontAwesomeIcon icon={faEye} /></p>
                </div>

                <div className="line"/>

                <div className="product-container">
                    <div className="info">
                        <p className="name"><img src={isLive ? show.product_image_url : process.env.PUBLIC_URL+'/static/images/AdobeXD.png'} alt="Adobe XD" onError={(e) => e.target.style.display = "none"}/> {isLive ? show.product_name : 'Adobe XD Beta'}</p>
                        <p className="description">{isLive ? show.product_description : 'This product is a vector-based user experience design tool for web apps and mobile apps.'}</p>
                    </div>
                    <p className="price" price={`${isLive ? show.product_price : '299'}$`} onClick={() => window.open(isLive ? show.product_url : 'https://www.adobe.com/products/xd.html', '_blank')}></p>
                </div>

                <div className="comments-container">
                    {this.state.showComments && <div className="comments">
                        {this.state.comments.map((c, i) => 
                            <div className="comment" key={i}>
                                <img alt="profile" src={`${process.env.PUBLIC_URL}/static/images/profile/${c.name}.${c.name !== 'Guest' ? 'jpeg' : 'png'}`}/>
                                <div>
                                    <p className="name">{c.name}</p>
                                    <p className="text" style={c.name === 'Guest' ? {wordBreak: 'break-all'} : {}}>{c.text}</p>
                                </div>
                            </div>
                        )}
                    </div>}

                    <div className="add">
                        <input 
                            type="text" 
                            name="comment" 
                            value={this.state.comment} 
                            onChange={this.handleComment} 
                            onKeyUp={e => e.key === 'Enter' && this.addComment()}
                            placeholder="Add a Comment..."
                        />
                        <span className="send toggle-comments" onClick={() => this.setState({ showComments: !this.state.showComments })}><FontAwesomeIcon icon={faComment} /></span>
                        <span className="send" onClick={this.addComment}><FontAwesomeIcon icon={faPaperPlane} /></span>
                    </div>
                </div>

                <div className="video-container">
                    <video autoPlay muted={this.state.muted} id="live-show">
                        <source src={process.env.PUBLIC_URL+"/static/AdobeXD.webm"} type="video/webm" width="100%" height="auto"/>
                    </video>
                    <span className="mute" onClick={() => this.setState({ muted: !this.state.muted })}><FontAwesomeIcon icon={this.state.muted ? faVolumeMute : faVolumeUp} /></span>
                </div>
            </div>
        )
    }
}

export default Show