import React from 'react';

const PortfolioItem = props => {
    const {ticker, qty, price, open} = props;
    const value = (qty * price).toFixed(2);

    const coloring = (price, open) => {
        let dynamicPerformance = price - open

        if (dynamicPerformance < 0) {
            return { color: 'red' }
        } else if (dynamicPerformance > 0) {
            return { color: 'green' }
        } else if (dynamicPerformance === 0) {
            return { color: 'grey' }
        }
    };

    return(
        <div style={coloring(price, open)}>
            {ticker} - {qty} Share(s) ${isNaN(value) ? null : value} 
        </div>
    )
};

export default PortfolioItem;