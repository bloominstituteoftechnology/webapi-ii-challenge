import React, { Component } from 'react'
import {Form, Input, Button} from '../sytles/PostStyles'
import { connect } from 'react-redux';
import {fetchPosts, addPost} from '../actions/index'



class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            contents: ""
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    createPost = e => {
        e.preventDefault()
        this.props.addPost(this.state)
        this.props.history.push("/")
    }
componentDidMount = () => {
  this.props.fetchPosts()
}

    render() {
        return (
            <div>
                <h1>LOTR QUOTES ADD</h1>
                <hr/>
        <Form onSubmit={this.createPost}>
                <Input
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Title"
                    onChange={this.handleChange}
                />
                <Input
                    name="contents"
                    value={this.state.contents}
                    id="post.id"
                    onChange={this.handleChange}
                    placeholder="Quote Content"
                    />
                    <br/>
                <Button type="submit" value="Save">
                    Save
        </Button>
    </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts
    }
}

export default connect(mapStateToProps, {fetchPosts, addPost})(AddPost)