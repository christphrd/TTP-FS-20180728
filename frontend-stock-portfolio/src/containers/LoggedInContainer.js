import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
// import { stocksBaseURL } from '../constants';

class LoggedInContainer extends React.Component {
    state = {
        onAudit: false
    };
    
    render() {
        const {account_balance, email, name} = {...this.props.userData};
        return (
            <div>
                <button onClick={this.props.logOut}>Log Out</button>
                <h2>Hi {name}, this is your email {email}.</h2>
                {this.state.onAudit ? null : <BuyTransaction balance={Number(account_balance).toFixed(2)} buyShares={this.props.buyShares}/>}
            </div>
        )
    }
};

export default LoggedInContainer;