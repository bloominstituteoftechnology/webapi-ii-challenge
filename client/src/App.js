import React, { Component } from 'react'
import PostList from './PostList'


class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.props.post$.subscribe(posts => this.setState({ posts }))
  }

  render() {
    return (
      <div className="App">
        <PostList posts={this.state.posts} />
      </div>
    )
  }
}

export default App
