import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      postsData: [],
      post: {
        title: '',
        contents: ''
      }
    };
  }

  componentDidMount() {
    axios.get('http://localhost.com/8000/api/posts')
    .then(response => {
      this.setState({ postsData: response.data })
    })
    .catch(err => {
      console.log(err, 'Oops!');
    })
  }

  render() {
    return (
      <div className="App">
       {  
                    this.state.postsData.map(post => (
                    <div className="post-card" key={post.id}>
                        <h4>
                        {post.title}
                        </h4>
                        <p>{post.contents}</p>
                    </div> 
                ))
                
                }
      </div>
    );
  }
}

export default App;
