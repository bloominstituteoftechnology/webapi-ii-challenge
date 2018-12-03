import React from 'react'

import axios from 'axios'

class UpdatePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            contents: '',
            posts: [],
        }
    }

    // props gotta come from App -> PostList -> PostView -> "routes here" -> UpdatePost
    // OR, easiest way is to put in ROUTES
    componentDidMount(){
        const id = this.props.match.params.id //where will this come from?, circle back
        axios 
        .get(`http://localhost:5000/api/posts/${id}`)
        .then(response => {
            const {title, contents} = response.data 
            this.setState({ title, contents })
        })
        .catch(err => {
            console.log("Fail to get individual post", err)
        })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
        console.log(this.state)
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleUpdatePost({...this.state, id: this.props.match.params.id})    //props gotta come from App -> PostList -> PostView -> UpdatePost
    }



    render(){
        console.log(this.props)
        return(
            <div>
                <h2> Update Note </h2>
                <form>
                    <textarea 
                        placeholder="Update Quote from LOTR"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    ></textarea>
                    <input 
                        placeholder="Update Guess who said this"
                        type="text"
                        name="contents"
                        value={this.state.contents}
                        onChange={this.handleChange}
                    />
                </form>
                <div onClick={this.handleSubmit}> Update </div>
            </div>
        )
    }
}

export default UpdatePost