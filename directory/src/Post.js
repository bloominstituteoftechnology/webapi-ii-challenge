import React, {Fragment} from 'react';
import './Post.css';

function Post(props) {
    // console.log(props);
    return (
        <div>
           <div className="title">"{props.post.title}"</div> 
           <div className="who">{props.post.contents}?</div>
        </div>
    )
}
export default Post