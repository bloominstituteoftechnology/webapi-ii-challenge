import React from 'react';
import {editPost, fetchSinglePost} from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class PostEdit extends React.Component {
    componentDidMount(){
        console.log(this.props.match.params);
        this.props.fetchSinglePost(this.props.match.params.id);
    }

    constructor(props){
        super(props);

        this.state = {
            title: this.props.currentPost.title,
            contents: this.props.currentPost.contents,
        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();

        let editedPost = {
            title: this.state.title,
            contents: this.state.contents
        }

        this.props.editPost(this.props.currentPost.id, editedPost);
        
        setTimeout(() => {
            this.props.history.replace('/');
        }, 100);
    }

    render() {

        return(
            <div>

            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleInput} name='title' value={this.state.title}></input>
                <input onChange={this.handleInput} name='contents' value={this.state.contents}></input>
                <button type = 'submit'>EDIT POST</button>
            </form>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      currentPost: state.currentPost,
      edited: state.edited,
      editing: state.editing
    }
  }
  
  export default withRouter(connect(mapStateToProps, {
    editPost,
    fetchSinglePost,
  })(PostEdit));
  