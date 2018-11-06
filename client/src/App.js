import React, { Component } from 'react';
import axios from "axios"
import styled from "styled-components"
import logo from './logo.svg';
import './App.css';

const Box = styled.div`
  border: 2px solid cyan;
  text-align: center;
`

class App extends Component {
  constructor() {
    super() 
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/posts')
    .then(res => {
      this.setState({data: res.data})
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         <Box>{!this.state.data ? <h3>Loading</h3> : this.state.data.map(i => <h4 key={i.id}>{i.title}</h4>)}</Box>
        </header>
      </div>
    );
  }
}

export default App;
