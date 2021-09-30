import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faVolumeUp, faComment } from '@fortawesome/fontawesome-free-solid'
import { faVolumeMute, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import randomComments from './random_comments.json'
import './scss/show.scss'

class Show extends Component {
    constructor() {
        super()
        this.state = {
            scrolled: false,
            muted: true,
            showComments: true,
            users: ['Benjamin', 'James', 'Oliver', 'Patricia', 'Charles'],
            comment: '',
            comments: []
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
            if (comments.clientHeight + comments.scrollTop >= comments.scrollHeight)
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
    componentDidMount() {
        if (document.documentElement.clientWidth <= 800)
            this.setState({
                showComments: false
            })
        
        this.checkScroll()
        this.generateComment()
    }
    componentDidUpdate() {
        this.state.showComments && !this.state.scrolled &&
            this.checkScroll()
    }
    render() {
        return (
            <div className="show-container">
                <div className="host-container">
                    <img src='/static/images/adobe.jpg' alt="adobe logo"/>
                    <h1>Adobe<span><br/>Live show started: 8:53 AM</span></h1>
                    <p className="views">83 <FontAwesomeIcon icon={faEye} /></p>
                </div>

                <div className="line"/>

                <div className="product-container">
                    <div className="info">
                        <p className="name"><img src='/static/images/AdobeXD.png' alt="Adobe XD" /> Adobe XD Beta</p>
                        <p className="description">This product is a vector-based user experience design tool for web apps and mobile apps.</p>
                    </div>
                    <p className="price" onClick={() => window.open('https://www.adobe.com/products/xd.html', '_blank')}></p>
                </div>

                <div className="comments-container">
                    {this.state.showComments && <div className="comments">
                        {this.state.comments.map((c, i) => 
                            <div className="comment" key={i}>
                                <img alt="profile" src={`/static/images/profile/${c.name}.${c.name !== 'Guest' ? 'jpeg' : 'png'}`}/>
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
                    <video autoPlay muted={this.state.muted}>
                        <source src="/static/AdobeXD.webm" type="video/webm" width="100%" height="auto"/>
                    </video>
                    <span className="mute" onClick={() => this.setState({ muted: !this.state.muted })}><FontAwesomeIcon icon={this.state.muted ? faVolumeMute : faVolumeUp} /></span>
                </div>
            </div>
        )
    }
}

export default Show