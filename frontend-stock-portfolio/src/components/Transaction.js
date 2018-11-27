import React from 'react';

const Transaction = props => {
    const {id, ticker, quantity, price} = props.transaction;
    const makeId = () => {
        return `transaction-`+ id
    };

    return (<li id={makeId()}>BUY ({ticker}) - {quantity} Share(s) @ ${Number(price).toFixed(2)}</li>)
};

export default Transaction;