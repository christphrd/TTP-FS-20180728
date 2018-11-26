import React from 'react';

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
            <div>
                <h4>Cash: ${this.props.balance}</h4>
                <form onSubmit={this.handleSubmit}>
                    <input name="ticker" type="text" placeholder="Ticker" onChange={this.handleChange}></input>
                    <input name="quantity" type="text" pattern="[0-9]*" placeholder="Qty (whole numbers only)" onChange={this.handleChange}></input>
                    <button type="submit" disabled={!isEnabled}>Buy</button>
                </form>
            </div>
        )
    }
};

export default BuyTransaction;