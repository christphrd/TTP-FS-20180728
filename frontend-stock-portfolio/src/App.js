import React from 'react';

import './App.css';
import { backendBaseURL, stocksBaseURL, HEADERS, authorizedHeaders} from './constants';

import Header from './components/Header.js';
import Home from './containers/Home.js';
import LoggedInContainer from './containers/LoggedInContainer.js';

import LinearProgress from '@material-ui/core/LinearProgress';

const App = props => {
  const [loading, setLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    fetchUserData()
  },[])

  const fetchUserData = async () => {
    if (localStorage.getItem("spra-token")) {
      setLoading(true);

      const settings = {headers: authorizedHeaders()};

      try {
        const res = await fetch(`${backendBaseURL}current_user`, settings)
        if (res.ok) {
          let json = await res.json();
          setUserData(json.user);
          setLoading(false);
          setIsLoggedIn(true);
        } else {
          console.log(res)
          setLoading(false);
        }  
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    };
  };

  const handleRegister = async data => {
    setLoading(true);

    const settings = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(`${backendBaseURL}register`, settings);
      const json = await response.json();
  
      if (json.status === 201) {
        localStorage.setItem("spra-token", json.token);

        setUserData(json.user);
        setLoading(false);
        setIsLoggedIn(true);
      } else {
        console.log(response, json)
        setLoading(false);
      }    
    } catch (err) {
      console.log(err)
      setLoading(false);

    } 
  };

  const handleSignIn = async data => {
    setLoading(true);

    const settings = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    };

    try {    
      const response = await fetch(`${backendBaseURL}signin`, settings);
      const json = await response.json();
  
      if (json.status === 200) {
        localStorage.setItem("spra-token", json.token);

        setUserData(json.user);
        setLoading(false);
        setIsLoggedIn(true);
      } else {
        console.log(response, json)
        setLoading(false);
      } 
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("spra-token");

    setIsLoggedIn(false);
    setUserData(null);
  };

  const buyShares = async ({ ticker, quantity }) => {
    let price
    const response = await fetch(`${stocksBaseURL}stock/${ticker}/price`)
    if (response.ok) {
      price = await response.json()
    } else {
      alert("Try again. Check the ticker symbol.")
      return
    }

    let balance = Number(userData.account_balance).toFixed(2)
    if (balance < quantity * price) {
      alert(`Sorry, buying ${quantity} shares of ${ticker} at $${price.toFixed(2)} would cost a total of $${(quantity * price).toFixed(2)}. You only have a balance of $${balance}.`)
      return
    }

    if (window.confirm(`Are you sure you want to buy ${quantity} share(s) of ${ticker} at $${price.toFixed(2)}? The total cost would be $${(quantity * price).toFixed(2)}. You would have a remaining balance of $${(balance - (quantity * price)).toFixed(2)}.`)) {
      confirmBuy({
        ticker: ticker,
        quantity: quantity,
        price: price,
        account_balance: (balance - (quantity * price)).toFixed(2)
      })
    }
  }

  const confirmBuy = async (data) => {
    const settings = {
      method: 'POST',
      headers: authorizedHeaders(),
      body: JSON.stringify(data)
    }

    let res = await fetch(`${backendBaseURL}transactions`, settings)
    if (res.ok) {
      let json = await res.json()
      setUserData({
          ...userData,
          account_balance: json.account_balance
        }
      )
      alert("Success!")
    } else {
      alert("Try again. There was an issue!")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        {loading ? <LinearProgress variant="query" style={{ flexGrow: 1}} /> : isLoggedIn ? <LoggedInContainer userData={userData} logOut={logOut} buyShares={buyShares} /> : <Home handleRegister={handleRegister} handleSignIn={handleSignIn} />}
      </body>
    </div>
  );
}

export default App;
