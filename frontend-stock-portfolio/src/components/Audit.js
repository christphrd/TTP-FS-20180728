import React from 'react';
import Transaction from './Transaction';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Audit = props => {
    const renderTransactions = () => {
        if (props.transactions.length > 0) {
            return props.transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)
        } else {
            return null
        }
    };

    return(
        <div>
            <Paper elevation={1} style={{ width: 500 }}>
                <Typography variant="headline" component="h3">
                    <b>Past Transactions</b>
                </Typography>
                <Table style={{ width: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Buy or Sell</TableCell>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Shares</TableCell>
                            <TableCell>Share Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTransactions()}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};

export default Audit;