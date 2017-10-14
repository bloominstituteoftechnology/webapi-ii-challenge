import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = { options: [] };
    axios('https://api.nasa.gov/planetary/apod?api_key=WYyVfYE892EoAieNu46TgpDPnYZb94BbRSLn1UhJ')
    .then((res) => {
      console.log(res.data);
      this.assign(res);
    });
  }
  assign = (res) => {
    this.setState({
      options: res.data
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/lambdawhite.png'} className="App-logo" alt="logo" />
          <br/>
          <br/>
          <br/>
          <div className="App-title">NASA API</div>
          
        </header>
        <div className="App-intro">
          <br/>
          <br/>
          <img id="nasaSky" src={this.state.options.url} width="400px"  />
          <p id="credits">Photo By:{this.state.options.copyright}</p>
          <p id="info">{this.state.options.explanation}</p>
          
        </div>
      </div>
    );
  }
}

export default App;
