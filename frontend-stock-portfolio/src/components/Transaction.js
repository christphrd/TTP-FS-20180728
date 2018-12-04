import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Transaction = props => {
    const {id, ticker, quantity, price} = props.transaction;

    return (
        <TableRow id={id}>
            <TableCell>BUY</TableCell>
            <TableCell>{ticker}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>@ ${Number(price).toFixed(2)}</TableCell>
        </TableRow>
    )
};

export default Transaction;