import React from 'react';
import RegistrationForm from '../components/RegistrationForm.js'

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
                {this.state.onRegister ? <RegistrationForm /> : <div>sign in component to make later</div> }
            </div>
        )
    }
};

export default Home;