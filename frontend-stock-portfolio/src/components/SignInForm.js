import React from 'react';

class SignInForm extends React.Component {
    state = {
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

        this.props.handleSignIn(this.state)
    };
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                <input name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                <button type="submit">Sign In</button>
            </form>
        )
    }
};

export default SignInForm;