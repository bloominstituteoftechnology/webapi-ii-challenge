import React from 'react';

function PostsList(props) {

    return (
      <div>
        <h2> List of Posts:</h2>

        <div>
          {props.postsList.map(post => <div className={"post"} key={post.id} post={post}>
            <p>Title:{post.title}</p>
            <p>Contents:{post.contents}</p>
          </div>)}
        </div>
      </div>
    );
}

export default PostsList;