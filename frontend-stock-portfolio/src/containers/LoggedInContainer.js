import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
import Audit from '../components/Audit';
import Portfolio from '../components/Portfolio';

import { backendBaseURL,  AUTH_HEADERS } from '../constants';

class LoggedInContainer extends React.Component {
    state = {
        onAudit: false,
        transactions: []
    };

    componentDidMount() {
      const settings = {
        headers: AUTH_HEADERS
      };

      fetch(`${backendBaseURL}audit`, settings)
      .then(res => res.json())
      .then(json => this.setState({
        ...this.state,
        transactions: json
      }))
      .catch(console.log)
    };

    handleNavClick = e => {
        const settings = {
            headers: AUTH_HEADERS
        };
        
        fetch(`${backendBaseURL}audit`, settings)
        .then(res => res.json())
        .then(json => this.setState({
            ...this.state,
            transactions: json,
            onAudit: !this.state.onAudit
        }))
        .catch(console.log)
    };
    
    render() {
        const {account_balance, email, name} = {...this.props.userData};
        return (
            <div>
                <button onClick={this.props.logOut}>Log Out</button>
                <button onClick={this.handleNavClick}>{this.state.onAudit ? "Portfolio and Buy" : "See Transactions"}</button>
                <h2>Hi {name}, this is your email {email}.</h2>
                {this.state.onAudit ? <Audit transactions={this.state.transactions} /> : <div><Portfolio /> <BuyTransaction balance={Number(account_balance).toFixed(2)} buyShares={this.props.buyShares}/></div>}
            </div>
        )
    }
};

export default LoggedInContainer;