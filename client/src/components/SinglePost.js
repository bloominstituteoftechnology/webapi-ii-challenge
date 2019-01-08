import React from 'react';

const Post = props => {
  console.log('props from individual post', props);
  return (
    <div className="post-container">
      <div>
        {props.posts.data.map((post, index) => {
          return post.id == props.match.params.id ? (
            <div>
              {post.title}
              {post.contents}
            </div>
          ) : (
            console.log('Nope!')
          );
        })}
      </div>
    </div>
  );
};

export default Post;
