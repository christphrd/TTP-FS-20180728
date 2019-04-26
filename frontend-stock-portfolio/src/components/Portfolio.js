import React from 'react';

import PortfolioItem from './PortfolioItem';
import { stocksBaseURL, backendBaseURL, authorizedHeaders} from '../constants';

import Paper from '@material-ui/core/Paper';

const portfolioStyle = {
    padding: '20px',
    width: '250px',
}

const Portfolio = props => {
    const [portfolio, setPortfolio] = React.useState([]);
    
    function useInterval(callback, delay) {
        const savedCallback = React.useRef();

        // Remember the latest callback.
        React.useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        React.useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    
    useInterval(() => {
        fetchPortfolio();
    }, 2000)
    
    const fetchPortfolio = async () => {
        const settings = { headers: authorizedHeaders() };

        const response = await fetch(`${backendBaseURL}portfolio`, settings)
        const json = await response.json()
        setPortfolio(json);
        getPrices();
    }

    const getPrices = () => {
        if (portfolio.length > 0) {
            portfolio.map((stock, i) => getPrice(stock, i))
        }
    };

    const getPrice = async (stock, i) => {
        let ticker = stock.ticker
        const priceRes = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
        const price = await priceRes.json()

        const ohlcRes = await fetch(`${stocksBaseURL}stock/${ticker}/ohlc`)
        const ohlc = await ohlcRes.json()

        setPortfolio(replaceOneElementInArray(portfolio, i, Object.assign(stock, { price: price, open: ohlc.open.price })))
    }

    const replaceOneElementInArray = (arr, ind, sub) => {
        let copy = arr.slice()
        copy[ind] = sub
        return copy
    }

    const renderStocks = () => {
        if (portfolio.length > 0 ) {
            return portfolio.map(stock => {
                let {ticker, qty, price, open} = stock;
                return <PortfolioItem key={ticker} ticker={ticker} qty={qty} price={price} open={open} />
            })
        } else {
            return null
        }
    };

    return(
        <Paper elevation={1} style={{width: '300px'}}>
            <div id="portfolio" style={portfolioStyle}>
                <h3>Portfolio</h3>
                {renderStocks()}
            </div>
        </Paper>
    )
};

export default Portfolio;