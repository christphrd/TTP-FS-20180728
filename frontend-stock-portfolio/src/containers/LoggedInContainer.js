import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
import Audit from '../components/Audit';
import Portfolio from '../components/Portfolio';

import Button from '@material-ui/core/Button';

import { backendBaseURL, authorizedHeaders} from '../constants';

class LoggedInContainer extends React.Component {
    state = {
        onAudit: false,
        transactions: []
    };

    handleNavClick = e => {
        const settings = { headers: authorizedHeaders() };
        
        fetch(`${backendBaseURL}audit`, settings)
        .then(res => res.json())
        .then(json => this.setState({
            transactions: json,
            onAudit: !this.state.onAudit
        }))
        .catch(err => this.setState({
            onAudit: !this.state.onAudit
        }, () => console.log(err)))
    };
    
    render() {
        const {account_balance, email, name} = this.props.userData;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.props.logOut}>Log Out</Button>
                <Button color="primary" onClick={this.handleNavClick}>{this.state.onAudit ? "Go to Portfolio" : "Go to Transactions"}</Button>
                <h2>
                    Hi {name}, this is your email: {email}.
                </h2>
                {this.state.onAudit ? <Audit transactions={this.state.transactions} /> : <div id="portfolio-container"><Portfolio /> <BuyTransaction balance={Number(account_balance).toFixed(2)} buyShares={this.props.buyShares}/></div>}
            </div>
        )
    }
};

export default LoggedInContainer;