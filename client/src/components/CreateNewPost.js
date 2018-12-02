import React from 'react'

class CreateNewPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            contents: '',
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleAddNewPost({...this.state})
    }


    render(){
        return(
            <div>
                <h2> Create New Notes </h2>
                <form>
                    <textarea 
                        placeholder="Quote from LOTR"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <input 
                        placeholder="Guess who said this"
                        type="text"
                        name="contents"
                        value={this.state.contents}
                        onChange={this.handleChange}
                    />
                </form>
                <div onClick={this.handleSubmit}> Create </div>
            </div>
        )
    }
}



export default CreateNewPost