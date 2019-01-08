import React from 'react';

const Post = props => {

    const post = props.posts.find( post  => { return props.match.params.id === `${post.id}`})
    console.log(post)
    return (
        <div>
          
        </div>
    );
};

export default  Post