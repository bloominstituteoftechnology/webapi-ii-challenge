import React from 'react';
import { connect } from 'react-redux';
import { Posts } from './styled';
import PostCard from './PostCard';
import { toggleShow } from '../actions';

const PostList = props => {
  return(
    <Posts>
      {props.posts.map(post => <PostCard
                                  key={post.id} 
                                  {...post}
                                  click={() => props.toggleShow(post.id) }
                                />)}
    </Posts>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { toggleShow })(PostList);
