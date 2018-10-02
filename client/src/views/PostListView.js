import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts, deletePost, setUpdatePost } from '../store/actions';

import PostsContainer from '../components/Posts/PostsContainer';

class PostListView extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    handleDelete = id => {
        this.props.deletePost(id);
    }

    handleUpdate = (e, id) => {
        e.preventDefault();
        this.props.setUpdatePost(id);
        this.props.history.push('/form');
    }

    render() {
        return (
            <PostsContainer {...this.props} posts={this.props.posts} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
        );
    };
};

const mapStateToProps = state => ({
    posts: state.posts,
});

export default connect(mapStateToProps, { getPosts, deletePost, setUpdatePost })(PostListView);