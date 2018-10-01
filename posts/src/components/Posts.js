import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class Posts extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('posts, mapStateToProps', state);
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchPosts })(Posts);