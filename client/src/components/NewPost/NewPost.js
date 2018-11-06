import React from 'react';
import axios from 'axios';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: ''
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.title && this.state.contents) {
            const newPost = Object.assign({}, { title: this.state.title, contents: this.state.contents });
            axios
                .post('http://localhost:9000/api/posts', newPost)
                .then(response => {
                    this.props.toggleModal();
                    this.props.addNewPostToState(response.data);
                })
                .catch(err => console.log(err));
        } else {
            alert('Please complete both fields.')
        }
    }

    render() {
        return (
            <div className="new-post-modal">
                <form className="new-post-form" onSubmit={this.submitHandler}>
                    <h2 className="new-post-heading">Add New Quote</h2>
                    <textarea
                        type="text"
                        name="title"
                        placeholder="New quote"
                        onChange={this.changeHandler}
                        value={this.state.title}
                    />
                    <input
                        type="text"
                        name="contents"
                        placeholder="New quote sayer"
                        onChange={this.changeHandler}
                        value={this.state.contents}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewPost;