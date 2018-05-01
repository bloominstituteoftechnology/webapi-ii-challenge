import React from 'react';

const post = props => {

    return (
        <div>
            <li>
                <a href="#">
                    <h2>{props.post.title}</h2>
                    <p>{props.post.contents}</p>
                </a>
            </li>
        </div>
    );
};
export default post;