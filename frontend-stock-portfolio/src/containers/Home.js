import React from 'react';

import RegistrationForm from '../components/RegistrationForm.js';
import SignInForm from '../components/SignInForm.js';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// class Home extends React.Component {
//     state = {
//         onRegister: false
//     };

//     handleNavClick = e => {
//         this.setState({
//             onRegister: !this.state.onRegister
//         })
//     };

//     render() {
const Home = props => {
    const [onRegister, setOnRegister] = React.useState(false);

    const handleNavClick = e => setOnRegister(!onRegister);

    return(
        <div>
            <Card id="home-card" raised={true}>
                <CardContent>
                    {onRegister ? <RegistrationForm handleRegister={props.handleRegister} /> : <SignInForm handleSignIn={props.handleSignIn} /> }
                    <Divider />
                    <p>OR</p>
                    <Button variant="contained" color="default" onClick={handleNavClick}>{onRegister ? "Go to Sign In" : "Create an Account" }</Button>
                </CardContent>
            </Card>
        </div>
    )
    // }
};

export default Home;