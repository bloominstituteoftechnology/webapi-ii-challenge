import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Post from "./Post"

// pull in actions from action/index
import { fetchPosts } from '../../actions';

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        console.log("state " ,this.props);
        return (
            <div>
            {this.props.posts.map(post => {
              return (
                <Link to={`/post/${post.id}`} key={post.id} >
                  <Post post={post} />
                </Link>
              );
            })}
          </div>
        )
    }
}


const mapDispatchToProps = state => {
    console.log(state.postsReducer);
    const  postsReducer  = state.postsReducer;
    return postsReducer;
  };
  
export default connect(mapDispatchToProps, { fetchPosts })(PostsList);