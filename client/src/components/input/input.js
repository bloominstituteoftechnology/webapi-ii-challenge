import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class InputForm extends React.Component {
    state = {
        title: '',
        contents: 'guess who said it'
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addQuote = (ev) => {
        ev.preventDefault();
        axios.post(`http://localhost:5000/api/posts`, this.state)
            .then(res => this.props.getPosts())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <StyledForm onSubmit={this.addQuote}>
            <h2>Add a Quote!</h2>
                <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                <button type='submit'>Add Quote</button>
            </StyledForm>
    )}
}

const StyledForm = styled.form`
    h2 {
        color: lightgray;
    }

    input {
        width: 600px;
        font-size: 16px;
        background: lightgray;
    }

    button {
        font-size: 16px;
        background: lightblue;
        cursor: pointer;

        &:hover {
            background: white;
            color: black;
        }
        &:active {
            background: black;
            color: white;
        }
    }
`

export default InputForm;