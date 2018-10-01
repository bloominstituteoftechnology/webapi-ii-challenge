import React from 'react';

const Post = (props) => {
    console.log(props);
        return(
            <div>
                <h1>{props.contents}:</h1>
                <p>{props.title}</p>
            </div>
        )
}

export default Post;