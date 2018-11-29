import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
// import {Route} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      guessInput: '',
      newPostTitle: '',
      updatedPostTitle: '',
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        // console.log(response)
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.log(error, 'client-get-error')
      })
  }
  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  addNewPostHandler = e => {
    // e.preventDefault();
    axios.post('http://localhost:5000/api/posts', {
      title: this.state.newPostTitle,
      contents: 'Guess who said this'
    })
      .then(response => {
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.log(error, 'client-post-error')
      })
  }
  deletePostHandler = e => {
    // e.preventDefault();
    console.log(e.target.parentNode.id);
    axios.delete(`http://localhost:5000/api/posts/${e.target.parentNode.id}`)
      .then(response => {
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.log(error, 'client-delete-error')
      })
    window.location.reload();
  }
  updatePostHandler = e => {
    // e.preventDefault();
    console.log(e.target.parentNode);
    axios.put(`http://localhost:5000/api/posts/${e.target.parentNode.id}`, {
      title: this.state.updatedPostTitle,
      contents: 'Guess who said this'
    })
      .then(response => {
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.log(error, 'client-update-error')
      })
  }
  render() {
    return (
      <div className="App">
        <h1>Node-Express-Lab Practice:</h1>
        <form onSubmit={this.addNewPostHandler} className='add-new-post'>
          <h5>Add New Post:</h5>
          <input name='newPostTitle' placeholder='type title here..' onChange={this.onChangeHandler}></input>
          <button type="submit">Submit</button>
        </form>
        <div className='all-posts'>
          {this.state.posts.map((eachPost) => {
            return (
              <div key={eachPost.id} id={eachPost.id} className='each-post'>
                <div className='post-content'>
                  <h3>"{eachPost.title}"</h3>
                  <input name="guessInput" onChange={this.onChangeHandler} placeholder={eachPost.contents}></input>
                </div>
                <form onSubmit={this.updatePostHandler} className='update-form'>
                  <h5>Update Post here:</h5>
                  <textarea name='updatedPostTitle' className='update-input' placeholder='update here' onChange={this.onChangeHandler}></textarea>
                  <br />
                  <button type="submit">Submit</button>
                </form>
                <button className='delete-button' onClick={this.deletePostHandler}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
