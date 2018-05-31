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
    axios.get('http://localhost:5555/api/posts')
      .then(result => this.setState({ posts: result.data.posts }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="container">
        <div className='row'>
          {this.state.posts.map((post, ind) => {
            return <div className="card mb-sm-4 col-sm-3 ui-state-default" key={ind}>
                <div className="card-head no-bg">
                  <h5 className="d-sm-inline">{post.title}</h5>
                </div>
                <div className="list-group list-group-flush">
                  <p className="mt-sm-2">{post.contents}</p>
                </div>
              </div>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
