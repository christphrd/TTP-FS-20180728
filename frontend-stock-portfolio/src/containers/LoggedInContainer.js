import React from 'react';

class LoggedInContainer extends React.Component {
    render() {
        console.log(this.props);
        let user = this.props.userData;
        return (
            <div>
                <button onClick={this.props.logOut}>Log Out</button>
                <h2>Hi {user.name}, logged in container. Portfolio: ${Number(user.account_balance).toFixed(2)}</h2>
            </div>
        )
    }
};

export default LoggedInContainer;