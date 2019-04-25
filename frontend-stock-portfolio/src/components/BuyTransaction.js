import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const buyStyle = {
    padding: '20px',
    width: '200px',
}

const BuyTransaction = props => {
    const [ticker, setTicker] = React.useState("");
    const [quantity, setQuantity] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();

        props.buyShares({ ticker: ticker.trim().toUpperCase(), quantity: Number(quantity) })
    };

    return (
        <Paper elevation={1} style={buyStyle}>
            <div id="buy-transaction">
                <h4>Cash: ${props.balance}</h4>
                <form onSubmit={handleSubmit}>
                    <input name="ticker" type="text" placeholder="Ticker" onChange={e => setTicker(e.target.value)}></input><p />
                    <input name="quantity" type="text" pattern="[0-9]*" placeholder="Qty (whole nos. only)" onChange={e => setQuantity(e.target.value)}></input><p />
                    <Button variant="outlined" color="primary" type="submit" disabled={!(ticker.length > 0 && Number(quantity) > 0)}>Buy</Button>
                </form>
            </div>
        </Paper>
    )
};

export default BuyTransaction;