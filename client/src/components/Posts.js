import React from 'react';

const Posts = (props) => {
    console.log(props.props.title);
    return (
        <div>
            <h4>{props.props.contents}</h4>
            <p>{props.props.title}</p>
        </div>
    )
}

export default Posts;