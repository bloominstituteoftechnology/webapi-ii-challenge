import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPost, updatePost } from '../store/actions';

import PostForm from '../components/Posts/PostForm';

class PostFormView extends Component {
    state = {
        post: {
            id: '',
            title: '',
            contents: '',
        },
        isUpdating: false,
    };

    componentDidMount() {
        if (this.props.isUpdating) {
            this.setState({
                isUpdating: true,
                post: this.props.postToUpdate
            })
        }
    };

    handleChange = e => {
        this.setState({
            post: {
                ...this.state.post,
                [e.target.name]: e.target.value,
            }
        });
    };

    addNewPost = e => {
        e.preventDefault();
        this.props.addPost(this.state.post);
        this.props.history.push('/posts');
    };

    updateExistingPost = post => {
        this.setState({
            isUpdating: false,
        }, () => {
            this.props.updatePost(this.state.post);
            this.props.history.push('/posts');
        });
    };

    render() {
        return (
            <PostForm
                {...this.props}
                post={this.state.post}
                addNewPost={this.addNewPost}
                updateExistingPost={this.updateExistingPost}
                isUpdating={this.state.isUpdating}
                handleChange={this.handleChange}

            />
        )
    }
};

const mapStateToProps = state => ({
    postToUpdate: state.postToUpdate,
    isUpdating: state.isUpdating
});

export default connect(mapStateToProps, { addPost, updatePost })(PostFormView);