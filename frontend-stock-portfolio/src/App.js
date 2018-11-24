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
    console.log(response, json);
    if (json.status === 201) {
      this.setState({
        isLoggedIn: true,
        userData: json.user
      }, () => console.log(this.state))
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
          {this.state.isLoggedIn ? <div>logged in is true</div> : <Home handleRegister={this.handleRegister} />}
        </body>
      </div>
    );
  }
}

export default App;
