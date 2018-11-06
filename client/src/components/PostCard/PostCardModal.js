import React from 'react';

const PostCardModal = props => {
    return (
        <div className="post-card-modal">
            <div className="post-card-modal-edit">Edit</div>
            <div className="post-card-modal-delete">Delete</div>
            <div className="post-card-modal-close" onClick={props.toggleModal}>X</div>
        </div>
    );
}

export default PostCardModal;