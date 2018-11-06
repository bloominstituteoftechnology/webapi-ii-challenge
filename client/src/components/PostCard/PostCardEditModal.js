import React from 'react';

const PostCardEditModal = (props) => {
    return (
        <div className="post-card-edit-modal">
            <div className="post-card-edit-back" onClick={props.toggleEditModal}>{`<`}</div>
            <form className="post-card-edit-form">
                <textarea className="post-card-edit-title" />
                <input className="post-card-edit-contents" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostCardEditModal;