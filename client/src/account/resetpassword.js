import React, { Component } from 'react'

class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            re_password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
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
            { text: 'Password', name: 'password', value: this.state.password },
            { text: 'Re-enter Password', name: 're_password', value: this.state.re_password }
        ]
        return (
            <>
                {fields.map((field, i) => 
                    <div className={"form__group field resetpassword " + field.name} key={i}>
                        <input
                            type="password"
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

export default ResetPassword