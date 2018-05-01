import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPost } from "../actions";

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPost();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>User Generated Posts:</h2>
        {this.props.posts.map((eachPost, index) => (
          <Link to={`api/posts/${index}`}>
            <div className="EachNote" key={index}>
              <h1>{eachPost.title}</h1>
              <p>{eachPost.contents}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    fetchingPosts: state.fetchingPosts
  };
};

export default connect(mapStateToProps, {
  fetchPost
})(List);
