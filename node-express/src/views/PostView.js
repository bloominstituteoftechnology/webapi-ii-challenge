import React from 'react';
import {connect} from 'react-redux';

import { fetchPosts, setUpdatePost, deletePost } from '../actions';

import Post from '../components/Post';

class PostView extends React.Component {
    constructor(props) {
        super(props);

        
    }
    componentDidMount() {
        if (this.props.posts.length === 0) {
            this.props.fetchPosts();
        }
    }

    goToUpdatePostForm = (event, id) => {
        event.preventDefault();
        this.props.setUpdatePost(id);
        this.props.history.push('/addPost');
    }

    render() {
        return (
            <Post
            {...this.props}
            posts={this.props.posts}
            fetchingPosts={this.props.fetchingPosts}
            goToUpdatePostForm={this.goToUpdatePostForm}
            />
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    fetchingPosts: state.fetchingPosts
});

export default connect(mapStateToProps, { fetchPosts, setUpdatePost, deletePost })(PostView);