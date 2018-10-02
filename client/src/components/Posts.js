import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, addPost, deletePost } from '../actions';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: ''
        }
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    handlerInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createPost = () => {
        this.props.addPost(this.state);
        window.location.reload();
        this.setState({
            title: '',
            contents: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Lord of the Rings</h3> 
                Post Quote: 
                <input type="text" name="title" placeholder="Quote" onChange={this.handlerInput} />
                <input type="text" name="contents" placeholder="Source" onChange={this.handlerInput} />
                <input type="submit" onClick={this.createPost} />
                {this.props.posts.map(post => 
                    <div>
                        <h6 key={post.id}>{post.title} -{post.contents}</h6>
                        <button onClick={() => this.props.deletePost(post.id)}>Delete</button>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchPosts, addPost, deletePost })(Posts);