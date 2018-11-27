import React from 'react';

class PortfolioItem extends React.Component {
    render() {
        console.log(this.props)
        const {ticker, qty, price} = this.props;
        return(
            <div>
                {ticker} - {qty} Share(s) ${(qty * price).toFixed(2)} 
            </div>
        )
    }
};

export default PortfolioItem;