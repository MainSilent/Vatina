import React, { Component } from 'react'

class Features extends Component {
    inViewport(element) {
        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        )
    }
    componentDidMount() {
        const features = document.querySelectorAll('.feature')

        if (document.documentElement.clientHeight <= 500)
            features.forEach(feature => {
                feature.style.animation = 'feature_animation 0.7s forwards'
                feature.querySelector('div').style.animation = 'first_child_animation 0.7s forwards'
                feature.querySelector('img').style.animation = 'last_child_animation 0.7s forwards'
            })
        else             
            document.onscroll = () => {
                features.forEach(feature => {
                    if (this.inViewport(feature)) {
                        feature.style.animation = 'feature_animation 0.7s forwards'
                        feature.querySelector('div').style.animation = 'first_child_animation 0.7s forwards'
                        feature.querySelector('img').style.animation = 'last_child_animation 0.7s forwards'
                    }
                })
            }
    }
    render() {
        return (
            <div className="features">
                <div className="feature">
                    <img src={process.env.PUBLIC_URL+"/static/images/feature1.png"} alt="Share Your Products"/>
                    <div>
                        <h2>Share Your Products</h2>
                        <p>
                            Let customers know that you do have more products available through a live show and Check Your Reviews and Ratings.
                            It is not enough to just take a photo, Describe your product and put it on your website. Sometimes it helps to go above and beyond and create special pieces of content that will help other people to get more familiar with your products.
                        </p>
                    </div>
                </div>

                <div className="feature">
                    <div>
                        <h2>Easy and Simple to Control</h2>
                        <p>
                            Without any previous knowledge and experience you can start a live show online in a few minutes, Live shows can be a fun way to grow your business and market. It's easier than many people think. All you need to do is to sign up.
                        </p>
                    </div>
                    <img src={process.env.PUBLIC_URL+"/static/images/feature2.png"} alt="Easy and Simple to Control"/>
                </div>

                <div className="feature">
                    <img src={process.env.PUBLIC_URL+"/static/images/feature3.png"} alt="Exchange Ideas"/>
                    <div>
                        <h2>Exchange Ideas</h2>
                        <p>
                            Selling online takes a little bit more work than most people realize, so the experience needs to be a two-way conversation.
                            To stay competitive and attract clients, You need to Interact with them.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Features