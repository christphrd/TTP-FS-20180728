import React from 'react';

import PortfolioItem from './PortfolioItem';
import { stocksBaseURL, backendBaseURL, HEADERS} from '../constants';

import Paper from '@material-ui/core/Paper';

const portfolioStyle = {
    padding: '20px',
    width: '250px',
}

class Portfolio extends React.Component {
    state = {
        portfolio: []
    };

    componentDidMount(){
        this.fetchPortfolio();

        this.interval = setInterval(() => {
            this.fetchPortfolio()
        }, 2000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchPortfolio = async () => {
        const settings = {
            headers: {
                ...HEADERS,
                Authorization: `Bearer ${localStorage.getItem("spra-token")}`
            }
        };

        const response = await fetch(`${backendBaseURL}portfolio`, settings)
        const json = await response.json()
        this.setState({
            ...this.state,
            portfolio: json
        }, () => this.getPrices())
    }

    getPrices = async () => {
        if (this.state.portfolio.length > 0) {
            this.state.portfolio.map((stock, i) => this.getPrice(stock, i))
        }
    };

    getPrice = async (stock, i) => {
        let ticker = stock.ticker
        const priceRes = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
        const price = await priceRes.json()

        const ohlcRes = await fetch(`${stocksBaseURL}stock/${ticker}/ohlc`)
        const ohlc = await ohlcRes.json()

        this.setState({
            portfolio: this.replaceOneElementInArray(this.state.portfolio, i, Object.assign(stock, { price: price , open: ohlc.open.price}))
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
                let {ticker, qty, price, open} = {...stock};
                return <PortfolioItem key={ticker} ticker={ticker} qty={qty} price={price} open={open} />
            })
        } else {
            return null
        }
    };

    render() {
        return(
            <Paper elevation={1} style={{width: '300px'}}>
                <div id="portfolio" style={portfolioStyle}>
                    <h3>Portfolio</h3>
                    {this.renderStocks()}
                </div>
            </Paper>
        )
    }
};

export default Portfolio;