import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: '',
      posts: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:5050/api/posts')
      .then(result => {
        console.log('result data users array', result.data.posts)
        this.setState({ posts: result.data.posts })
      })
  }

  handleContents = (e) => {
    this.setState({ contents: e.target.value })
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = () => {
    let postInfo = {
      title: this.state.title,
      contents: this.state.contents
    }

    axios
      .post('http://localhost:5050/api/posts', postInfo)
      .then(() => {
        axios
          .get('http://localhost:5050/api/posts')
          .then(result => {
            console.log('result data users array', result.data.posts)
            this.setState({ posts: result.data.posts })
          })

      })
  }
  render() {
    return (
      <div className="App">
        <div>
          <label>
            <input value={this.state.title} onChange={this.handleTitle} />
            <input value={this.state.contents} onChange={this.handleContents} />
          </label>
          <button onClick={this.handleSubmit}> Add to Posts </button>
        </div>
        {this.state.posts.map(element => {
          return <div><h4>{element.title}</h4><p>{element.contents}</p></div>
        })}
      </div>
    );
  }
}

export default App;
