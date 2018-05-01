import React from 'react'

const postlist = props => {

    return(
        <div>
            {props.posts.map((post) => {
                return <h5>{post.title}</h5>
            })}
        </div>
    );
};
export default postlist;