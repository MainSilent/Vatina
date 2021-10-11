import React, { Component } from 'react'

class AddShow extends Component {
    render() {
        return (
            <div className="add-show">
                <form className="add-form">
                    <input type="text" name="title" placeholder="Title"/>
                    <input type="text" name="product-name" placeholder="Product Name"/>
                    <input type="text" name="product-url" placeholder="Product Url"/>
                    <input type="number" name="product-price" placeholder="Product $Price" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                    <textarea name="product-description" placeholder="Product Description" rows="10"></textarea>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

export default AddShow