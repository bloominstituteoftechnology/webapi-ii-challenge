import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import axios from 'axios';
import { Navigation, Home } from '../components';
import { Route } from 'react-router-dom';

const URL = 'http://localhost:8000/api/posts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(URL)
      .then(({data}) => {
        // console.log(data);
        this.setState({data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if(!this.state.data) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Node-Express-Lab</h1>
          </header>
          <p className="App-intro">
          </p>
        </div>
      );
    }

    return (
      <div className="App">
        <Navigation />
        <Route exact path="/"
          render={props => (
            <Home {...props} posts={this.state.data} />
          )}
        />
      </div>
    );
  }
}

export default App;
