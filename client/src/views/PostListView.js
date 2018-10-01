import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../store/actions';

import PostsContainer from '../components/Posts/PostsContainer';

class PostListView extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <PostsContainer posts={this.props.posts} />
        );
    };
};

const mapStateToProps = state => ({
    posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(PostListView);