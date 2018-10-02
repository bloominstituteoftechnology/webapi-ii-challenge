import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    max-width: 880px;
    margin: 100px auto;
`;

function PostForm(props) {
    function handleSubmit(e) {
        e.preventDefault();

        if(props.isUpdating) {
            props.updateExistingPost();
        }
        else {
            props.addNewPost(e);
        }
    };

    return (
        <Wrapper>
            <form>
                <p>{props.isUpdating ? 'Edit Post' : 'Create New Post'}</p>
                <input type="text" placeholder="Post Title" name="title" id="defaultFormContactNameEx" className="form-control" defaultValue={props.post.title} onChange={props.handleChange}/>
                <br />
                <textarea type="text" placeholder="Post Content" name="contents" id="defaultFormContactMessageEx" className="form-control" rows="3" value={props.post.contents} onChange={props.handleChange}></textarea>
                <button type="button" onClick={handleSubmit}>{props.isUpdating ? 'Update' : 'Save'}</button>
            </form>
        </Wrapper>
    )
};

export default PostForm;