import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={ data: [] }
  }

  componentDidMount(){
    axios.get("http://localhost:9000/api/posts").then(res => {
      this.setState({
        data: res.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        {!this.state.data ? <h2>Loading</h2> : this.state.data.map(i => {
          return <p>{i.title}</p>
        })}
      </div>
    );
  }
}

export default App;
