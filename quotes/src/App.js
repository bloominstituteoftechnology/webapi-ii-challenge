import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9001/api/posts")
      .then(res => this.setState(
        {quotes: res.data}
        ))
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      this.state.quotes !== [] ?
      <div className="App">
        {this.state.quotes.map(quote => {
          return <p key={quote.id}>{quote.title}</p>
        })}
      </div>: null
    );
  }
}

export default App;
