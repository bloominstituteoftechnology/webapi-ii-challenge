import React, { Component } from 'react';

import { createNote } from '../../actions/';

class Create extends Component {
    state = {
        title: '',
        contents: '',
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit() {
        this.props.createNote(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={() => this.props.handleSubmit()}>
                    <input name="title" onChange={this.handleChange.bind(this)}/>
                    <input name="contents" onChange={this.handleChange.bind.(this)}/>
                    <button value="Submit">Submit New Post</button>
                </form>
            </div>
        );
    }

export default Create;