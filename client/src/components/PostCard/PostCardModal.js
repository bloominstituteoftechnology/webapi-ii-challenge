import React from 'react';

const PostCardModal = props => {
    return (
        <div className="post-card-modal">
            <div className="post-card-modal-edit" onClick={props.toggleEditModal}>Edit</div>
            <div className="post-card-modal-delete" onClick={() => props.deletePost(props.id)}>Delete</div>
            <div className="post-card-modal-close" onClick={props.toggleModal}>X</div>
        </div>
    );
}

export default PostCardModal;