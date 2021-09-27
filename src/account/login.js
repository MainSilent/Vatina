import React, { Component } from 'react'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            isForget: false,
            email: '',
            password: ''
        }
        this.forgetPassword = this.forgetPassword.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    forgetPassword(event) {
        const email = document.querySelector('#email')
        if (!email.value)
            email.classList.add('invalid')
        else {
            email.classList.remove('invalid')
            this.setState({
                isForget: true,
            })
        }
    }
    handleInputChange(event) {
        const target = event.target
        const name = target.name
        this.setState({ [name]: target.value })
    }
    componentDidMount() {
        document.querySelectorAll(".form__field").forEach(elem => {
            elem.addEventListener("keyup", event => event.key === "Enter" && this.props.submit())
        })
    }
    render() {
        const fields = [
            { text: 'Email', name: 'email', value: this.state.email },
            { text: 'Password', name: 'password', value: this.state.password }
        ]
        return (
            <>
                {fields.map((field, i) => 
                    <div className={"form__group field login " + field.name} key={i}>
                        <input
                            type={field.name}
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
                {
                !this.props.isSubmit && 
                <p className={`login forget_password ${this.state.isForget ? 'active' : ''}`} onClick={this.forgetPassword}>
                    {!this.state.isForget ? 'Forget Password' : 'An email have been sent.'}
                </p>
                }
            </>
        )
    }
}

export default Login