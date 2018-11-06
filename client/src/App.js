import React, { Component } from 'react'
import Posts from './components/Posts'
import Post from './components/Post'
import axios from 'axios'
import { Route } from 'react-router-dom'
import Form from './components/Form'

import './app.css'

class App extends Component {
  state = {
    posts: [],
    post: {},
    title: '',
    contents: '',
    countDeleted: 0
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(e => {
        console.log(e, 'ERROR')
      })
  }
  getById = id => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          contents: res.data.contents
        })
      })
      .catch(e => console.log(e, 'err'))
  }

  deletePost = id => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        this.setState({
          countDeleted: res.data
        })
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }

  render() {
    return (
      <div className="app-container">
        <Route exact path="/form/postform" component={Form} />
        <Route
          exact
          path="/posts"
          render={props => <Posts {...props} posts={this.state.posts} getById={id => this.getById(id)} />}
        />
        <Route
          path="/posts/:id"
          render={props => <Post {...props} posts={this.state.posts} deletePost={id => this.deletePost(id)} />}
        />
      </div>
    )
  }
}

export default App
