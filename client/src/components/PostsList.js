import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import {withRouter} from 'react-router-dom';
import Post from './Post';

class PostsList extends React.Component {

    componentDidMount(){
        console.log(this);
        this.props.fetchPosts();
    }

    constructor(props){
        super(props);
    }

    render() {
        console.log(this.props.posts);
        return (
            <div>
                Posts List
                {this.props.posts.map(post => {
                    return <Post {...post} />
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