import React from 'react';

import RegistrationForm from '../components/RegistrationForm.js';
import SignInForm from '../components/SignInForm.js';

class Home extends React.Component {
    state = {
        onRegister: false
    };

    handleNavClick = e => {
        this.setState({
            onRegister: !this.state.onRegister
        })
    };

    render() {
        return(
            <div>
                <button onClick={this.handleNavClick}>{this.state.onRegister ? "Go to Sign In" : "Create an Account" }</button>
                {this.state.onRegister ? <RegistrationForm handleRegister={this.props.handleRegister} /> : <SignInForm handleSignIn={this.props.handleSignIn} /> }
            </div>
        )
    }
};

export default Home;