import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import {backendBaseURL} from './constants/index.js';
import Home from './containers/Home.js';

class App extends Component {
  state = {
    isLoggedIn: false,
    userData: null
  };

  handleRegister = async data => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        password_confirmation: data.password
      })
    };
    
    const response = await fetch(`${backendBaseURL}users`, settings);
    const json = await response.json();

    if (json.status === 201) {
      localStorage.setItem("token", json.token);

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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(`${backendBaseURL}auth`, settings);
    const json = await response.json();

    if (json.status === 200) {
      localStorage.setItem("token", json.token);

      this.setState({
        isLoggedIn: true,
        userData: json.user
      });
    } else {
      console.log(response, json)
    } 
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          App header
        </header>
        <body>
          <h2>In app component</h2>
          {this.state.isLoggedIn ? <div>logged in is true</div> : <Home handleRegister={this.handleRegister} handleSignIn={this.handleSignIn} />}
        </body>
      </div>
    );
  }
}

export default App;
