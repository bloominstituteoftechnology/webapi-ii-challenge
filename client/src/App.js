import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: '',
    }
  }
  componentDidMount() {
    this.getStuff();
  }
  getStuff = () => {
        axios
          .get(`http://localhost:5000/api/posts`)
          .then(response => {
            this.setState({ posts: response.data });
          })  
          .catch(err => {
            console.log(err);
          });
        }
  render() {
    return (
      <div className="App">
       {this.state.posts.map(stuff => {
         return (
           <div className="post-card App-logo">
            <h2 className="App-content"> {stuff.title}</h2>
            <h4 className="App-content">{stuff.contents}</h4>
             </div>
         )
       })}
      </div>
    );
  }
}

export default App;
