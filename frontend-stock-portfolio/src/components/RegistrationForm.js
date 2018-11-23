import React from 'react';

class RegistrationForm extends React.Component {
    render(){
        return(
            <form>
                <input name="name" type="text" placeholder="name"></input>
                <input name="email" type="text" placeholder="email"></input>
                <input name="password" type="password" placeholder="password"></input>
                <button type="submit">Register</button>
            </form>
        )
    }
};

export default RegistrationForm;