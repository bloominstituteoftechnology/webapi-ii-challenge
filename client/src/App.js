import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.gatherData();
  }

  gatherData = () => {
    axios.get("http://localhost:8000/api/posts/")
    .then(res => {
      this.setState({ posts: res.data })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.state.posts.map(p => {
            return <div key={p.id} className='postWrapper'>
                    <div><b>{p.title}</b></div>
                    <div>{p.contents}</div>
                  </div>
          })}
        </div>
      </div>
    );
  }
}

export default App;
