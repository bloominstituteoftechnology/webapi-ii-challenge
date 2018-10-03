import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import {withRouter, Link} from 'react-router-dom';
import Post from './Post';

class PostsList extends React.Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.posts.map(post => {
                    return <Link to={`/posts/${post.id}`} key={post.id}><Post {...post} /></Link>
                })}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchPosts
})(PostsList));