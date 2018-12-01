import React, { Component } from 'react';

class Form extends Component    {
    constructor(props)  {
        super(props);
        this.state  =   {
            title: "",
            contents: "",
        }
    }
    render()    {
        return(
            <div>
                <input placeholder="title" value={this.state.title} />
                <input placeholder="contents" value={this.state.contents} />
            </div>
        )
    }
}

export default Form;
