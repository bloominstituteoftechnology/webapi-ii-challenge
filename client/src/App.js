import React, { Component } from 'react';
import './App.css';
import PostsList from './components/PostsList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      postsList: [],
    };
  }
  componentDidMount(){
    this.getPosts("http://localhost:8000/api/posts")
  }
  getPosts = URL => {
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({postsList: data});
      })
      .catch(err => {
        console.log(err)
      });
  };
  render() {
    return (
      <div className="App">
        <PostsList posts={this.state.postsList} />
      </div>
    );
  }
}

export default App;
