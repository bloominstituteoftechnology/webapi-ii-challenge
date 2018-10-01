import React from 'react';
import Post from './Post';

export default class PostList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.posts.map(post => {
            return (
              <Post key={Math.random(Date.now() * 1000)} post={post} />
            )
          })
        }
      </div>
    )
  }
}