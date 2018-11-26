import React from 'react';

class PortfolioItem extends React.Component {
    render() {
        const {ticker, qty} = this.props;
        return(
            <div>
                {ticker} - {qty} Share(s)
            </div>
        )
    }
};

export default PortfolioItem;