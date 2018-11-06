import React from 'react';

import './NewPost.css';

const NewPostButton = props => {
    return <div className="new-post-button" onClick={props.toggleModal}>{props.displayModal ? 'x' : '+'}</div>
}

export default NewPostButton;