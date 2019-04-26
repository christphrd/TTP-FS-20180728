import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import Button from '@material-ui/core/Button';

const RegistrationForm = props => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();

        props.handleRegister({name: name, email: email, password: password})
    };

    return(
        <form className="home-form" onSubmit={handleSubmit}>
            <TextField
                name="name"
                type="text"
                placeholder="name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                onChange={e => setName(e.target.value)}
            /><p />
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
            <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>
    )
};

export default RegistrationForm;