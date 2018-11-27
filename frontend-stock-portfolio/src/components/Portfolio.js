import React from 'react';

import PortfolioItem from './PortfolioItem';
import { stocksBaseURL, backendBaseURL, AUTH_HEADERS } from '../constants';

class Portfolio extends React.Component {
    state = {
        portfolio: []
    };

    componentDidMount(){
        const settings = {
            headers: AUTH_HEADERS
        };

        const fetching = async () => {
            const response = await fetch(`${backendBaseURL}portfolio`, settings)
            const json = await response.json()
            this.setState({
                ...this.state,
                portfolio: json
            }, () => this.getPrices())
        }

        fetching()
    };

    getPrices = async () => {
        this.state.portfolio.map((stock, i) => this.getPrice(stock, i))
    };

    getPrice = async (stock, i) => {
        let ticker = Object.keys(stock)[0]
        const response = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
        const price = await response.json()
        this.setState({
            portfolio: this.replaceOneElementInArray(this.state.portfolio, i, Object.assign(stock, { price: price }))
        })
    }

    replaceOneElementInArray = (arr, ind, sub) => {
        let copy = arr.slice()
        copy[ind] = sub
        return copy
    }

    renderStocks = () => {
        if (this.state.portfolio.length > 0 ) {
            return this.state.portfolio.map(stock => {
                let ticker = Object.keys(stock)[0], qty = Object.values(stock)[0];
                return <PortfolioItem key={ticker} ticker={ticker} qty={qty} price={stock.price} />
            })
        } else {
            return null
        }
    };

    render() {
        return(
            <div>
                Portfolio
                {this.renderStocks()}
            </div>
        )
    }
};

export default Portfolio;