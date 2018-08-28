import React from 'react';
import { connect } from 'react-redux';
import { Posts } from './styled';
import PostCard from './PostCard';
import { toggleShow, deletePost } from '../actions';

const PostList = ({ posts, toggleShow, deletePost }) => {
  posts.sort((a, b) => b.id - a.id);
  return(
    <Posts>
      {posts.map(post => <PostCard
                                  key={post.id}
                                  {...post}
                                  show={() => toggleShow(post.id)}
                                  del={() => deletePost(post.id)}
                                />)}
    </Posts>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { toggleShow, deletePost })(PostList);
