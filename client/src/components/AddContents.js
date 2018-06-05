import React, { Component } from 'react';

class AddContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: ''
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleNewContents = () => {
        this.props.newContent(this.state)
        this.setState({ title: '', contents: ''})
    }

    render() {
        return (
            <div className='form'>
                <input className='title-input'
                    type='text'
                    name='contents'
                    placeholder='title'
                    value={this.state.contents}
                    onChange={this.handleInput}
                />
                <textarea className='text-input'
                    type='text'
                    name='title'
                    placeholder='contents'
                    value={this.state.title}
                    onChange={this.handleInput}
                />
                <button className='add-button' 
                    onClick={this.handleNewContents}
                    >
                    Add
                </button>
            </div>
        );
    }
}

export default AddContents;