import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import Home from './containers/Home.js';

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          App header
        </header>
        <body>
          <h2>In app component</h2>
          {this.state.isLoggedIn ? <div>logged in is true</div> : <Home />}
        </body>
      </div>
    );
  }
}

export default App;
