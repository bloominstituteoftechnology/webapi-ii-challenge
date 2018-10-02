import  React from 'react';
import './Post.css';

const CreatePost = props =>{
    return (
        <div className="create-edit-form">
            <h1>Create New Post:</h1>
            {/* {console.log(props)} */}
                <input  type="text"
                        className="title-input"
                        name="title"
                        value={props.post.title}
                        onChange={props.handleInput}/>
                <input  type="text"
                        className="textBody-input"
                        name="textBody"
                        value={props.post.textBody}
                        onChange={props.handleInput}/>
                <button className="save-input-button"
                        onClick={props.handleAddNewPost}>Save</button>
        </div>
    )
}

export default CreatePost;