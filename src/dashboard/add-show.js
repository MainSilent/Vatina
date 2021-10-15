import React, { Component } from 'react'
import AuthContext from '../AuthContext'

class AddShow extends Component {
    constructor() {
        super()
        this.state = {
            isSubmit: false,
            error: '',
            msg: ''
        }
        this.submit = this.submit.bind(this)
    }
    async submit(e) {
        e.preventDefault()
        if (this.state.isSubmit) return
        this.setState({ error: '', msg: '', isSubmit: true })

        try {
            const req = await fetch("/api/show/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.context.token
                },
                body: JSON.stringify({
                    title: e.target['title'].value,
                    product_name: e.target['product-name'].value,
                    product_url: e.target['product-url'].value,
                    product_image_url: e.target['product-image-url'].value,
                    product_price: e.target['product-price'].value,
                    product_description: e.target['product-description'].value
                })
            })
    
            const res = await req.json()
            if (req.status === 200) {
                await this.props.fetchShows()
                this.setState({
                    isSubmit: false
                })
                this.props.history.push('/dashboard/show/'+res.playback_id)
            } else {
                this.setState({
                    isSubmit: false,
                    error: !res.detail ? `${Object.keys(res.message)[0].capitalizeTxt().replace(/_/g, ' ')} Error: ${res.message[Object.keys(res.message)[0]][0]}` : res.detail
                })
            }
        }
        catch (e) {
            console.log(e)
            this.setState({
                isSubmit: false,
                error: 'Network Error'
            })
        }
    }
    render() {
        return (
            <div className="add-show">
                {this.state.error && <div className="alert" style={{ color: 'red' }}>{this.state.error}</div>}
                {this.state.msg && <div className="alert" style={{ color: 'black' }}>{this.state.msg}</div>}

                <form className="add-form" onSubmit={this.submit}>
                    <input type="text" name="title" placeholder="Title"/>
                    <input type="text" name="product-name" placeholder="Product Name"/>
                    <input type="text" name="product-url" placeholder="Product Url"/>
                    <input type="text" name="product-image-url" placeholder="Product Image Url"/>
                    <input type="number" name="product-price" placeholder="Product $Price" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                    <textarea name="product-description" placeholder="Product Description" rows="10"></textarea>
                    <button type="submit">{this.state.isSubmit ? <div className="loader"></div> : 'Add'}</button>
                </form>
            </div>
        )
    }
}

AddShow.contextType = AuthContext

export default AddShow