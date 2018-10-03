import React from 'react';

const AddForm = props => {
return (
    <form className="add-post">
        <h2>Write a Post</h2>
        <input onChange={ props.inputHandler } name="contents" placeholder="Name"></input>
        <textarea onChange={ props.inputHandler } name="title" placeholder="Your message here..."></textarea>
        <div onClick={ (e) => {props.addPost(); e.currentTarget.parentElement.reset()}} className="button">Add Post</div>
    </form>
)
}

export default AddForm;