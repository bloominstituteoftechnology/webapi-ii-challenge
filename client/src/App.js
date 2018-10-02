import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import PostContainer from './PostContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts')
        .then(response=> {
          console.log(response);
          this.setState({posts: response.data})
        })
        .catch(err=> {
          console.log(err);
        });
  }

  addPost = event=> {
    this.setState({
      title: '',
      contents: ''
    })
  };

  addPost = ()=> {
    axios.post('http://localhost:8000/api/posts', {
      title: this.state.title,
      contents: this.state.contents
    })
      .then(response=> {
        console.log(response);
        this.setState({posts: response.data})
      })
      .catch(err=> {
        console.log(err);
      })
  };

  handleInputChange = (event)=> {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.addPost}>
          <input 
            type='text'
            name='title'
            placeholder='Title'
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='contents'
            placeholder='Contents'
            value={this.state.contents}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Add Post</button>
        </form>
        <PostContainer posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
