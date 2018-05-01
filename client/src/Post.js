import React from 'react';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newContent: '',
            show: false
        }
    }



    updatePost = event => {
        event.preventDefault();
        const { newTitle, newContent } = this.state
        const postEdit = {
            title: newTitle,
            contents: newContent
        }
        axios.put(`http://localhost:5000/api/posts/${this.props.id}`, postEdit)
            .then(response => {
                // console.log(response);
                this.setState({ newTitle: '', newContent: '' })
                this.props.update();
            })
            .catch(err => {
                console.error(err)
            });
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    toggle = () => {
        this.setState({ show: !this.state.show });
    }

    render() {
        return (
            <div>
                <div>
                    <strong>{`${this.props.id}. ${this.props.title}`}</strong>
                    <p>{this.props.contents} <button onClick={this.toggle} >edit</button> </p>

                    {this.state.show ?
                        <div>
                            <form onSubmit={this.updatePost} >
                                <input
                                    type="text"
                                    name="newTitle"
                                    className="input"
                                    value={this.state.newTitle}
                                    placeholder="New title"
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="newContent"
                                    className="input"
                                    value={this.state.newContent}
                                    placeholder="New contents"
                                    onChange={this.handleInputChange}
                                />
                            </form>
                            <button type="submit" onClick={this.updatePost} >Update Post</button>
                            <button onClick={() => this.props.remove(this.props.id)} >Remove Post</button>
                        </div> :
                        null}
                </div>
            </div>
        )
    }
}

export default Post;