import React, { Component } from 'react';

import './App.css';
import { backendBaseURL, stocksBaseURL, HEADERS} from './constants';

import Header from './components/Header.js';
import Home from './containers/Home.js';
import LoggedInContainer from './containers/LoggedInContainer.js';

import LinearProgress from '@material-ui/core/LinearProgress';

class App extends Component {
  state = {
    loading: false,
    isLoggedIn: false,
    userData: null
  };

  componentDidMount() {
    if (localStorage.getItem("spra-token")) {
      this.setState({
        loading: true
      });

      const settings = {
        headers: {
          ...HEADERS,
          Authorization: `Bearer ${localStorage.getItem("spra-token")}`
        }
      };

      fetch(`${backendBaseURL}current_user`, settings)
      .then(res => res.json())
      .then(json => this.setState({
        loading: false,
        isLoggedIn: true,
        userData: json.user
      }))
      .catch(err => {
        console.log(err)
        this.setState({loading: false})
      })
    };
  };

  handleRegister = async data => {
    const settings = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    };
    
    const response = await fetch(`${backendBaseURL}register`, settings);
    const json = await response.json();

    if (json.status === 201) {
      localStorage.setItem("spra-token", json.token);

      this.setState({
        isLoggedIn: true,
        userData: json.user
      });
    } else {
      console.log(response, json)
    }
  };

  handleSignIn = async data => {
    const settings = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    };

    const response = await fetch(`${backendBaseURL}signin`, settings);
    const json = await response.json();

    if (json.status === 200) {
      localStorage.setItem("spra-token", json.token);

      this.setState({
        isLoggedIn: true,
        userData: json.user
      });
    } else {
      console.log(response, json)
    } 
  };

  logOut = () => {
    localStorage.removeItem("spra-token");

    this.setState({
      isLoggedIn: false,
      userData: null
    });
  };

  buyShares = async ({ ticker, quantity }) => {
    let price
    const response = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
    if (response.ok) {
      price = await response.json()
    } else {
      alert("Try again. Check the ticker symbol.")
      return
    }

    let balance = Number(this.state.userData.account_balance)
    if (balance < Number(quantity) * price) {
      alert(`Sorry, buying ${quantity} shares of ${ticker.toUpperCase()} at $${price.toFixed(2)} would cost a total of $${(Number(quantity) * price).toFixed(2)}. You only have a balance of $${balance.toFixed(2)}.`)
      return
    }

    if (window.confirm(`Are you sure you want to buy ${quantity} share(s) of ${ticker.toUpperCase()} at $${price.toFixed(2)}? The total cost would be $${(Number(quantity) * price).toFixed(2)}. You would have a remaining balance of $${(balance - (Number(quantity) * price)).toFixed(2)}.`)) {
      this.confirmBuy({
        ticker: ticker.toUpperCase(),
        quantity: Number(quantity),
        price: price,
        account_balance: Number(balance - (Number(quantity) * price)).toFixed(2)
      })
    }
  }

  confirmBuy = async (data) => {
    const settings = {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${localStorage.getItem("spra-token")}`
      },
      body: JSON.stringify(data)
    }

    let res = await fetch(`${backendBaseURL}transactions`, settings)
    if (res.ok) {
      let json = await res.json()
      this.setState({
        userData: {
          ...this.state.userData,
          account_balance: json.account_balance
        }
      })
      alert("Success!")
    } else {
      alert("Try again. There was an issue!")
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body>
          {this.state.loading ? <LinearProgress variant="query" style={{ flexGrow: 1}} /> : this.state.isLoggedIn ? <LoggedInContainer userData={this.state.userData} logOut={this.logOut} buyShares={this.buyShares} /> : <Home handleRegister={this.handleRegister} handleSignIn={this.handleSignIn} />}
        </body>
      </div>
    );
  }
}

export default App;
