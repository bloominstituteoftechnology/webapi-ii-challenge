import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component    {
    constructor(props)  {
        super(props);
        this.state  =   {
            title: "",
            contents: "",
            buttonContent: "Submit"
        }
    }


    onChangeHandler =   ({target})  =>  {
        this.setState((state)   =>  ({
            [target.name]: target.value,
        }))
    }

    onClickHandler  =   ()  =>  {
        if(this.props.match.params.id)  {
            axios.put(`http://localhost:4000/api/posts/${this.props.match.params.id}`, { title: this.state.title, contents: this.state.contents} )
                .then((data)    =>  {
                    this.props.getPosts()
                    this.setState((state)   =>  ({
                        title: "",
                        contents: ""
                    }))
                })
        }   else {
            axios.post(`http://localhost:4000/api/posts`, { title: this.state.title, contents: this.state.contents })
                .then((data)    =>  {
                    this.props.getPosts()
                    this.setState((state)   =>  ({
                        title: "",
                        contents: ""
                    }))
                })
        }
    }

    render()    {
        return(
            <div>
                <input onChange={this.onChangeHandler} name="title" placeholder="title" value={this.state.title} />
                <input onChange={this.onChangeHandler} name="contents" placeholder="contents" value={this.state.contents} />
                <div onClick={this.onClickHandler}>
                    {this.state.buttonContent}
                </div>
            </div>
        )
    }
}

export default Form;
