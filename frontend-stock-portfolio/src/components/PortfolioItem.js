import React from 'react';

class PortfolioItem extends React.Component {
    coloring = (price, open) => {
        let dynamicPerformance = price - open

        if (dynamicPerformance < 0) {
            return { color: 'red' }
        } else if (dynamicPerformance > 0) {
            return { color: 'green' }
        } else if (dynamicPerformance === 0) {
            return { color: 'grey' }
        }
    }

    render() {
        const {ticker, qty, price, open} = this.props;
        const value = (qty * price).toFixed(2)
        return(
            <div style={this.coloring(price, open)}>
                {ticker} - {qty} Share(s) ${value} 
            </div>
        )
    }
};

export default PortfolioItem;