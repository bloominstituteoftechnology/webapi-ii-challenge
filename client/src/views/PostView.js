import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts, deletePost, setUpdatePost } from '../store/actions';
import PostPage from '../components/Posts/PostPage';

class PostView extends Component {
    componentDidMount() {
        if(this.props.posts.length === 0) {
            this.props.getPosts();
        }
    };

    handleDelete = id => {
        this.props.deletePost(id);
    }

    handleUpdate = (e, id) => {
        e.preventDefault();
        console.log('UPDATE',id);
        this.props.setUpdatePost(id);
        this.props.history.push('/form');
    }

    render() {
        return (
            <PostPage {...this.props} post={this.props.posts} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
        )
    }
};

// const mapStateToProps = state => {
//     console.log(state);
// };

const mapStateToProps = state => ({
    posts: state.posts,
});

export default connect(mapStateToProps, { getPosts, deletePost, setUpdatePost })(PostView);