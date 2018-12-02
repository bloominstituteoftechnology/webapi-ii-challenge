import React from 'react'

import axios from 'axios'

class PostView extends React.Component {
    constructor(){
        super();
        this.state = {
            // post: {},
            title: '',
            contents: '',
        }
    }

    componentDidMount(){
        //const id = this.props.match.params.id    //can only use this with routes
        const id = this.props.post.id    //passing each post from PostList.js as props
        
        axios 
        .get(`http://localhost:5000/api/posts/${id}`)
        .then(response => {
            console.log(response.data)
            const {title, contents} = response.data[0]   //first and only entry
            this.setState({ title, contents })
        })
        .catch(err => {
            console.log("Fail to get individual post", err)
        })
    }

    handleDelete = event => {
        event.preventDefault();
        this.props.handleDeletePost(this.props.post.id)
    }
    


    render(){
        // console.log(this.state)
        console.log(this.props)
        return(
            <div className="card">
                <div>
                    <p>{this.state.title}</p>
                    <h2>{this.state.contents}</h2>
                </div>
                <div>
                    <div onClick={this.handleDelete}> Delete </div>
                </div>
            </div>
        )
    }
}

export default PostView