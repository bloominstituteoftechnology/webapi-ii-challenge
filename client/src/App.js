import React, { Component } from 'react'
import Posts from './components/Posts'
import Post from './components/Post'
import axios from 'axios'
import { Route } from 'react-router-dom'
import './app.css'

class App extends Component {
  state = {
    posts: [],
    title: '',
    contents: ''
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

  render() {
    return (
      <div className="app-container">
        <Route exact path="/" render={props => <Posts {...props} posts={this.state.posts} getById={(id) => this.getById(id)} />} />
        <Route path="/:id" render={props => <Post {...props} posts={this.state.posts} />} />
      </div>
    )
  }
}

export default App
