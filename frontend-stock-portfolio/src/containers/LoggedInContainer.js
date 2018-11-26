import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
import Audit from '../components/Audit';

import { backendBaseURL, HEADERS } from '../constants';

class LoggedInContainer extends React.Component {
    state = {
        onAudit: false,
        transactions: []
    };

    componentDidMount() {
      const settings = {
        headers: {
          ...HEADERS,
          Authorization: `Bearer ${localStorage.getItem("spra-token")}`
        }
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
        this.setState({
            ...this.state,
            onAudit: !this.state.onAudit
        })
    };
    
    render() {
        const {account_balance, email, name} = {...this.props.userData};
        return (
            <div>
                <button onClick={this.props.logOut}>Log Out</button>
                <button onClick={this.handleNavClick}>{this.state.onAudit ? "Portfolio and Buy" : "See Transactions"}</button>
                <h2>Hi {name}, this is your email {email}.</h2>
                {this.state.onAudit ? <Audit transactions={this.state.transactions} /> : <BuyTransaction balance={Number(account_balance).toFixed(2)} buyShares={this.props.buyShares}/>}
            </div>
        )
    }
};

export default LoggedInContainer;