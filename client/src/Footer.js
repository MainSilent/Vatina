import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTwitterSquare,
    faFacebookSquare,
    faInstagramSquare,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faMapMarker } from '@fortawesome/fontawesome-free-solid'
import './scss/footer.scss'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="text">
                    <div className="terms">
                        <h2>Terms of Service</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>

                    <div className="privacy">
                        <h2>Privacy Policy</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>

                    <div className="contact-info">
                        <h2>Contact Info</h2>
                        <ul>
                            <li><FontAwesomeIcon icon={faPhone} /> Phone<br /> +98123456789</li>
                            <li><FontAwesomeIcon icon={faEnvelope} /> Email<br /> exmaple@email.com</li>
                            <li><FontAwesomeIcon icon={faMapMarker} /> Address<br /> Forrest Ray 191-103 Integer Rd. Corona New Mexico 08219</li>
                        </ul>
                    </div>
                </div>

                <div className="end">
                    <div className="copyright">
                        <p>© 2016-{new Date().getFullYear()} Vatina Inc. All rights reserved.</p>
                    </div>
                    <div className="social-icons">
                        <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitterSquare} /></a>
                        <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebookSquare} /></a>
                        <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagramSquare} /></a>
                        <a href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer