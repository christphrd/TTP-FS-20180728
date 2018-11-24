import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import {backendBaseURL, HEADERS} from './constants/index.js';
import Home from './containers/Home.js';
import LoggedInContainer from './containers/LoggedInContainer.js';

class App extends Component {
  state = {
    loading: false,
    isLoggedIn: false,
    userData: null
  };

  componentDidMount() {
    if (localStorage.getItem("spra-token")) {
      this.setState({
        ...this.state,
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
      .catch(console.log)
    };
  };

  handleRegister = async data => {
    const settings = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        ...data,
        password_confirmation: data.password
      })
    };
    
    const response = await fetch(`${backendBaseURL}register`, settings);
    const json = await response.json();

    if (json.status === 201) {
      localStorage.setItem("spra-token", json.token);

      this.setState({
        ...this.state,
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
        ...this.state,
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
      ...this.state,
      isLoggedIn: false,
      userData: null
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Stocks Portfolio React App
        </header>
        <body>
          {this.state.loading ? <div>loading...</div> : this.state.isLoggedIn ? <LoggedInContainer userData={this.state.userData} logOut={this.logOut} /> : <Home handleRegister={this.handleRegister} handleSignIn={this.handleSignIn} />}
        </body>
      </div>
    );
  }
}

export default App;
