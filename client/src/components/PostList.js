import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="PostList">
        {this.props.fetching ? (
          <p>Loading Posts...</p>
        ) : (
          <ul>
            {this.props.posts.map(post => {
              return <Post key={post.id} post={post} />;
            })}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  fetching: state.fetching,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
