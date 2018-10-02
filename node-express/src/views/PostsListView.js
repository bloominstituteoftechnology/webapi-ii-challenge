import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions';

import PostList from '../components/PostList';

class PostsListView extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <Fragment>
                <PostList {...this.props} posts={this.props.posts} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, { fetchPosts })(PostsListView);