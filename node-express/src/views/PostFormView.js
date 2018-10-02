import React from 'react';
import { connect } from 'react-redux';

import { addPost, setUpdatePost, updatePost } from '../actions';

import PostForm from '../components/PostForm';

class PostFormView extends React.Component {
    state = {
        post: {
            title: '',
            contents: '',
            id: '',
        },
        updatingPost: false,
    };

    componentDidMount() {
        if (this.props.postToUpdate) {
            this.setState({ updatingPost: true, post: this.props.postToUpdate});
        }
    }

    handleChange = event => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value,
            }
        });
    }

    handleAddNewPost = event => {
        event.preventDefault();
        console.log('firing AddNewPost');
        this.props.addPost(this.state.post);
        this.props.history.push('/');
    }

    handleUpdatePost = () => {
        this.props.updatePost(this.state.post);
        this.props.history.push('/');
    }

    render() {
        return (
            <PostForm
            {...this.props}
            post={this.state.post}
            handleAddNewPost={this.handleAddNewPost}
            handleChange={this.handleChange}
            handleUpdatePost={this.handleUpdatePost}
            updatingPost={this.state.updatingPost}
            />
        );
    }
}

const mapStateToProps = state => ({
    postToUpdate: state.postToUpdate,
});

export default connect(mapStateToProps, { addPost, updatePost })(PostFormView);