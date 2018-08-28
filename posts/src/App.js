import React, { Component } from 'react';
import './App.css';
import axios from 'axios'; 

const url =   "http://localhost:8000/posts"

class App extends Component {
  constructor(){
    super(); 
    this.state={
      posts: []
    }
  }
  componentDidMount(){
    axios 
    .get(url)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => console.log(err))
    
  }
  render() {
    return (
      <div className="App">
      <div>
        {this.state.posts.map(item =>{
          <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.contents}</p>
          </div>
        })}
        </div>
      </div>
    );
  }
}

export default App;
