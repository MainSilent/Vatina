import React, { Component } from 'react'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            isForget: false,
            email: '',
            username: '',
            password: '',
            re_password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
    
        this.setState({ [name]: value })
    }
    componentDidMount() {
        document.querySelectorAll(".form__field").forEach(elem => {
            elem.addEventListener("keyup", event => event.key === "Enter" && this.props.submit())
        })
    }
    render() {
        const fields = [
            { text: 'Email', name: 'email', type: 'email', value: this.state.email },
            { text: 'Username', name: 'username', type: 'text', value: this.state.username },
            { text: 'Password', name: 'password', type: 'password', value: this.state.password },
            { text: 'Re-enter Password', name: 're_password', type: 'password', value: this.state.re_password },
        ]
        return (
            <>
                {fields.map((field, i) => 
                    <div className={"form__group field register " + field.name} key={i}>
                        <input
                            type={field.type}
                            className="form__field"
                            placeholder={field.text}
                            name={field.name}
                            id={field.name}
                            disabled={this.props.isSubmit}
                            onChange={this.handleInputChange}
                            value={field.value}
                            required 
                        />
                        <label
                            htmlFor={field.name}
                            className="form__label"
                        >
                            {field.text}
                        </label>
                    </div>
                )}
            </>
        )
    }
}

export default Register