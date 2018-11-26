import React from 'react';
import Transaction from './Transaction';

const Audit = props => {
    const renderTransactions = () => {
        return props.transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)
    };

    return(
        <div>
            <h5>Transactions</h5>
            <ul>{renderTransactions()}</ul>
        </div>
    )
};

export default Audit;