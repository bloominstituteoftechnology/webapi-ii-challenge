import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import QuotesList from './components/quotes/QuotesList'

class App extends Component {

  state = {
    quotes: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/posts`)
      .then( response => {
        
        this.setState({quotes: response.data})
        console.log(this.state.quotes)
      }).catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Quotes!</h1>
        <QuotesList quotes={this.state.quotes} />
      </div>
    );
  }
}

export default App;
