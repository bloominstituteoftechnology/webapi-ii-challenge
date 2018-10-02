import React from 'react';

const Post = props => {
    return (
        <div key={props.id}>
          <h4>{props.title}</h4>
	  <p>{props.contents}</p>
	</div>
    );
};

export default Post;
