import React, { Component } from 'react';
import logo from './the_one_ring_by_blackmoonrose13-d5hojmh.gif';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));      
  }

  render() {
    console.log(this.state.users);
    const styl = {
      height: "318",
      width: "180",
      border: "1px solid black",
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lord of the Rings</h1>
        </header>
        { 
          this.state.posts.map(post => {
          const { id, title, contents } = post;
            return (
              <div key={id} className="">
                <div style={styl} className="post-card">
                  <h1 className="post-title">{title}</h1>
                  <p>{contents}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}



export default App;
