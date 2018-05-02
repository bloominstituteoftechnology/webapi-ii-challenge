import React, { Component } from 'react';
import { getPost } from '../actions';
import { connect } from 'react-redux';
import './PostView.css';
import { Link } from 'react-router-dom';

class PostView extends Component {

    componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPost(id);
  }

  render() {
      console.log(this.props.post)
    return (
        <div className="mainList"><h3 className="headerposts">Post:</h3>
            <Link to={`/`} className="mainCard">
            <div className="postCard">
                <div className="oneContent">{this.props.post.contents}</div>
                <div className="oneTitle">{this.props.post.title}</div>
            </div>
            </Link>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    fetchPost: state.fetchPost,
    error: state.error
  };
};

export default connect(mapStateToProps, { getPost })(PostView);