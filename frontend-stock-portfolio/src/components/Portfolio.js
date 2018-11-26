import React from 'react';

import PortfolioItem from './PortfolioItem';
import { backendBaseURL, AUTH_HEADERS } from '../constants';

class Portfolio extends React.Component {
    state = {
        portfolio: {}
    };

    componentDidMount(){
        const settings = {
            headers: AUTH_HEADERS
        };

        fetch(`${backendBaseURL}portfolio`, settings)
        .then(res => res.json())
        .then(json => this.setState({
            ...this.state,
            portfolio: json
        }))
        .catch(console.log)
    };

    renderStocks = () => {
        let portfolio = this.state.portfolio;
        let render = [];
        for (let stock in portfolio){
            render.push(<PortfolioItem key={stock} ticker={stock} qty={portfolio[stock]} />)
        };

        return render
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