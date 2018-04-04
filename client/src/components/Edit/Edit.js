import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editPost } from '../../actions/';

class Edit extends Component {
    state = {
        id: '',
        title: '',
        contents: '',
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit() {
        this.props.editPost(this.state);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Edit</h1>
                <form onSubmit={() => this.handleSubmit()}>
                    <input name="title" onChange={this.handleChange.bind(this)}/>
                    <input name="contents" onChange={this.handleChange.bind(this)}/>
                    <button value="Submit">Edit Post</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { editPost })(Edit);