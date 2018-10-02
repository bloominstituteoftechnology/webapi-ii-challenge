import React, { Component } from "react";

// Components
import PostList from "./components/PostList";


// Auxillary
import { connect } from "react-redux";
import { getPosts, newPost } from "./actions";

// CSS
import "./App.css";


class App extends Component {

  state = {
    title: '',
  }

  componentDidMount() {
    this.props.getPosts();
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmitHandler = (e) => {
    this.props.newPost(this.state);
  }

  render() {
    return (
      <div className="App" style={{ margin: "20px 0" }}>
        {this.props.error ? (
          <div>
            <h4>{this.props.error} <a href="http://localhost:9000/">Root API Page</a></h4>
          </div>
        ) : (
          <React.Fragment>
            <form onSubmit={this.onSubmitHandler} style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
              <input onChange={this.onChangeHandler} type="text" name="title" placeholder="Title..." />
              <textarea onChange={this.onChangeHandler} name="contents" cols="30" rows="10" placeholder="Contents here..."></textarea>
              <button onClick={this.onSubmitHandler} type="submit">Submit</button>
            </form>
            <PostList posts={this.props.posts} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    posts: state.posts,
    error: state.error,
  };
};

export default connect(
  mapStateToProp,
  { getPosts, newPost }
)(App);
