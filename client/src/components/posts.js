import React, { Component } from 'react';

import Post from './post';

class Posts extends Component {
  render() {
    return (
      <div className="Posts">
        <h1>Smurf Village</h1>
        <h4>Click on the Smurfs Text you would like to update</h4>
        <ul>
          {this.props.posts.map(post => {
            return (
              <Post
                title={post.title}
                contents={post.contents}
                key={post.title}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}



export default Posts;