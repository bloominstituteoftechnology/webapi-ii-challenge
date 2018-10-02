import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostDiv = styled.div`
    border: solid black 1px;
    padding: 1%;
    background-color: lightgrey;
    font-size: 1.6rem;
`

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
`

const EditError = styled.div`
    font-size: 1.6rem;
    color: red;
    padding: 2%;
`


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            showEdit: false,
            editError: []
        };
    }

    deleteNote = (id) => {
        axios
        .delete(`http://localhost:8000/api/posts/${id}`)
        .then(response => {
            console.log(response)
            this.props.resetState();
        })
        .catch(err => console.log(err));
    }

    toggleEdit = () => {
        this.state({
            showEdit: !this.state.showEdit
        });
    }

    editPost = (id) => {
        const editedPost = {
            title: this.state.title,
            contents: this.state.contents
        }
        axios
        .put(`http://localhost:8000/api/posts/${id}`, editedPost)
        .then(response => {
            console.log('put response', response);
                this.setState({
                    title: '',
                    contents: ''
                })
                this.props.resetState();
        })
        .catch(error => this.setState({editError: error.response.data})
        )
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <PostDiv>
                <h2>{this.props.post.title}</h2>
                <p>{this.props.contents}</p>
                {this.state.showEdit ? (
                    <div>
                        <EditForm>
                            <input
                                type='text'
                                placeholder='Post Title'
                                onChange={this.handleChange}
                                name="title"
                                value={this.state.title}
                            />
                            <input
                                type="text"
                                placeholder='Post Contents'
                                onChange={this.handleChange}
                                name="contents"
                                value={this.state.contents}
                            />
                        </EditForm>
                        <button onClick={() => {this.editPost(this.props.post.id)}}>Submit</button>
                    </div>) : null
                }
                <button onClick={this.toggleEdit}>toggle Edit Form </button>
				<button onClick={() => {this.deleteNote(this.props.post.id)}}>Delete Post</button>
				<EditError><p>{this.state.editError.errorMessage}</p></EditError>
			</PostDiv>
        )
    }
}

export default Post