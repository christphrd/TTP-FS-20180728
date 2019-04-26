import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import Button from '@material-ui/core/Button';

const SignInForm = props => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();

        props.handleSignIn({email: email, password: password})
    };
    
    return(
        <form className="home-form" onSubmit={handleSubmit}>
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
            /><p />
            <Button type="submit" variant="contained" color="primary">Sign In</Button>
        </form>
    )
};

export default SignInForm;