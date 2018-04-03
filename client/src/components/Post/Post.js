import React from 'react';

import './Post.css';

export default (props) => {
    return (
        <div className="Post">
            <h3>{props.title}</h3>
            <h5>{props.contents}</h5>
        </div>
    )
}