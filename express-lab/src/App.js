import React, { Component } from 'react';
import axios from 'axios';
import './Styles/styles.css';


import Posts from './components/container/Posts';
import AddForm from './components/presentational/AddForm';


class App extends Component {

  state = {posts:[], input:{}};

  componentDidMount(){
    axios.get('http://localhost:7777/api/posts')
    .then(response => this.setState({...this.state, posts: response.data}))
    .catch(error => console.log(error));
  }


  addPost = () => {
    axios.post('http://localhost:7777/api/posts', {...this.state.input})
    .then(postresponse => {
      axios.get(`http://localhost:7777/api/posts/${postresponse.data.id}`)
      .then(getresponse =>   this.setState({...this.state, posts: [...this.state.posts, ...getresponse.data]}))
      .catch(error => console.log("Error getting: ", postresponse.data.id))
    })
    .catch(error => console.log("Error posting: ", error))
  }

  deletePost = (e) => {
    let currentId = e.currentTarget.dataset.id;
    let currentPostIndex = this.state.posts.findIndex(post => Number(post.id) === Number(currentId));
    console.log([...this.state.posts]);
    console.log([...this.state.posts.slice(0, currentPostIndex)]);
    console.log([...this.state.posts.slice(currentPostIndex + 1)]);
    console.log(currentPostIndex);
    axios.delete(`http://localhost:7777/api/posts/${currentId}`)
    .then(response => this.setState({...this.state, posts: [...this.state.posts.slice(0, currentPostIndex), ...this.state.posts.slice(currentPostIndex + 1)]}))
    .catch(error => console.log("Error deleting: ", error))
  }

  inputHandler = e => {
    this.setState({...this.state, input:{...this.state.input, [e.currentTarget.name]: e.currentTarget.value}})
  }

  render() {
    return (
      <div className="App">
        <AddForm post={this.state.input} inputHandler={this.inputHandler} addPost={this.addPost}/>
        <Posts posts={this.state.posts} deletePost={this.deletePost}/>
      </div>
    );
  }
}

export default App;
