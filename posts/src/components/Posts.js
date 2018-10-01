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
                <h3>Lord of the Rings' Quotations</h3> 
                {this.props.posts.map(post => 
                    <h6 key={post.id}>{post.title}</h6>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchPosts })(Posts);