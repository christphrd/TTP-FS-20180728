import React from 'react';

class RegistrationForm extends React.Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.handleRegister(this.state)
    };

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="name" type="text" placeholder="name" onChange={this.handleChange}></input>
                <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                <input name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                <button type="submit">Register</button>
            </form>
        )
    }
};

export default RegistrationForm;