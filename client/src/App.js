import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
    }
  }

  componentDidMount() {
      axios.get('http://localhost:9000/api/posts/')
           .then(response => {
                this.setState({posts : response.data})
            })
           .catch(error => console.log(error));
  }

  render() {
    console.log("++  ",this.state.posts);
    return (
      <div className = "App">
        <h1>Hello...</h1>
        {this.state.posts.map(post => <Posts 
                                            key = {post.id}
                                            props = {post} />
                              )}

      </div>
    );
  }
}

export default App;
