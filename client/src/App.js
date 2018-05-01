import React, { Component } from 'react'
import PostList from './PostList'

class App extends Component {
  state = {
    posts: []
  }

  style = {
    display: 'flex',
    justifyContent: 'center'
  }

  componentDidMount() {
    this.props.post$.subscribe(posts => this.setState({ posts }))
  }

  render() {
    return (
      <div style={this.style}>
        <PostList posts={this.state.posts} />
      </div>
    )
  }
}

export default App
