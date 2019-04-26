import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
import Audit from '../components/Audit';
import Portfolio from '../components/Portfolio';

import Button from '@material-ui/core/Button';

import { backendBaseURL, authorizedHeaders} from '../constants';

const LoggedInContainer = props => {
    const [onAudit, setOnAudit] = React.useState(false);
    const [transactions, setTransactions] = React.useState([]);

    const handleNavClick = e => {
        const settings = { headers: authorizedHeaders() };
        
        fetch(`${backendBaseURL}audit`, settings)
        .then(res => res.json())
        .then(json => {
            setOnAudit(!onAudit)
            setTransactions(json)
        })
        .catch(err => {
            setOnAudit(!onAudit)
            console.log(err)
        })
    };
    
    const {account_balance, email, name} = props.userData;
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={props.logOut}>Log Out</Button>
            <Button color="primary" onClick={handleNavClick}>{onAudit ? "Go to Portfolio" : "Go to Transactions"}</Button>
            <h2>
                Hi {name}, this is your email: {email}.
            </h2>
            {onAudit ? <Audit transactions={transactions} /> : <div id="portfolio-container"><Portfolio /> <BuyTransaction balance={Number(account_balance).toFixed(2)} buyShares={props.buyShares}/></div>}
        </div>
    )
};

export default LoggedInContainer;