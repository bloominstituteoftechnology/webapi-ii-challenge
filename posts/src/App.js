import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import {Router} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        console.log(response)
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div className="App">
        <h1>Node-Express-Lab Practice:</h1>

        <div className='all-posts'>
          {this.state.posts.map((eachPost) => {
            return (
              <div key={eachPost.id} id={eachPost.id} className='each-post'>
                <h3>"{eachPost.title}"</h3>
                <input placeholder={eachPost.contents}></input>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
