import React from 'react';

export default function PostForm(props) {
    return (
        <form>
            <input type="text"
            name="titleInput"
            placeholder="Title"
            value={props.titleInput}
            onChange={props.handleChange}
            />
            <input type="text"
            name="contentsInput"
            placeholder="Contents"
            value={props.contentsInput}
            onChange={props.handleChange}
            />
            <button onClick={props.addNewPost}>Add Post</button>
        </form>
    )
}