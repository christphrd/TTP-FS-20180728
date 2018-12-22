import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const buyStyle = {
    padding: '20px',
    width: '200px',
}

class BuyTransaction extends React.Component {
    state = {
        ticker: "",
        quantity: "",
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.buyShares({ticker: this.state.ticker.trim().toUpperCase(), quantity: Number(this.state.quantity)})
    };

    render() {
        let isEnabled = this.state.ticker.length > 0 && Number(this.state.quantity) > 0;

        return (
            <Paper elevation={1} style={buyStyle}>
                <div id="buy-transaction">
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