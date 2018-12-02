import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import Button from '@material-ui/core/Button';

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
            <form className="home-form" onSubmit={this.handleSubmit}>
                <TextField 
                    name="email" 
                    type="text" 
                    placeholder="email" 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                    onChange={this.handleChange}
                /><p />
                <TextField
                    name="password"
                    type="password"
                    placeholder="password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                    onChange={this.handleChange}
                /><p />
                <Button type="submit" variant="contained" color="primary">Sign In</Button>
            </form>
        )
    }
};

export default SignInForm;