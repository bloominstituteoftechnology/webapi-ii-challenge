import React from 'react';
import '../App.css'





const Posts = (props) => {
    console.log(props.props.title);
    return (
        <div className = "post-div">
            <h4>{props.props.contents}</h4>
            <p>{props.props.title}</p>
        </div>
    )
}

export default Posts;