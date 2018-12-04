import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class BuyTransaction extends React.Component {
    state = {
        ticker: "",
        quantity: "",
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.buyShares(this.state)
    };

    render() {
        let isEnabled = this.state.ticker.length > 0 && this.state.quantity.length > 0;

        return (
            <Paper elevation={1} style={{ width: 300 }}>
                <div style={{padding: 3}}>
                    <h4>Cash: ${this.props.balance}</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input name="ticker" type="text" placeholder="Ticker" onChange={this.handleChange}></input><p /> 
                        <input name="quantity" type="text" pattern="[0-9]*" placeholder="Qty (whole nos. only)" onChange={this.handleChange}></input><p />
                        <Button variant="outlined" color="primary" type="submit" disabled={!isEnabled}>Buy</Button>
                    </form>
                </div>
            </Paper>
        )
    }
};

export default BuyTransaction;