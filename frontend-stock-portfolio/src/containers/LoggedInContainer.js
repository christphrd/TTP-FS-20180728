import React from 'react';
import BuyTransaction from '../components/BuyTransaction';
// import { stocksBaseURL } from '../constants';

class LoggedInContainer extends React.Component {
    state = {
        onAudit: false
    };

    // buyShares = async ({ticker, quantity}) => {
    //     let stockPrice
    //     const response = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
    //     if (response.ok) {
    //         stockPrice = await response.json()
    //     } else {
    //         alert("Try again. Check the ticker symbol.")
    //         return
    //     }
        
    //     let balance = Number(this.props.userData.account_balance)
    //     if (balance < Number(quantity) * stockPrice) {
    //         alert(`Buying ${quantity} shares of ${ticker.toUpperCase()} at $${stockPrice.toFixed(2)} would cost a total of $${(Number(quantity) * stockPrice).toFixed(2)}. You only have a balance of $${balance.toFixed(2)}.`)
    //     } else {
    //         console.log("should alert to check")
    //         console.log("balance left: ", balance - (Number(quantity) * stockPrice))
    //         console.log(`buying ${Number(quantity)} shares at $${stockPrice}`)
    //     }
    // }
    
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