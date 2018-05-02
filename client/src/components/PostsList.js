import React, { Component } from 'react';
import { getPosts } from '../actions';
import { connect } from 'react-redux';
import './PostsList.css';
import { Link } from 'react-router-dom';

class PostsList extends Component {
  state = {
    title: '',
    contents: ''
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
        <div className="mainList"><h3 className="headerposts">Posts:</h3>
          {this.props.posts.map(post => <Link to={`/posts/${post.id}`} key={post.id} className="overall">
                                            <div key={post.id} className="postList">
                                                <div className="postContent">{post.contents}:</div>
                                                <div className="postTitle">{post.title}</div>
                                            </div>
                                        </Link>)}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    fetchingPosts: state.fetchingPosts,
    error: state.error
  };
};

export default connect(mapStateToProps, { getPosts })(PostsList);