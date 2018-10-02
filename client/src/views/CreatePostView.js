import React from 'react';
import {connect} from 'react-redux';
import CreatePost from '../components/CreatePost';
import { addNewPost } from '../store/actions';

class CreatePostView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:{
                title: "",
                contents: ""
            }
        }
    }

    handleInput = event =>{
        this.setState({ ...this.state,
                        post:{...this.state.post, [event.target.name]: event.target.value}});

    }

    handleAddNewPost = event => {
        event.preventDefault();
        this.props.addNewPost(this.state.post);
        // window.location.reload();
        this.props.history.push("/");
    }

    render(){
        return (
            <div className="create-view-container">
                <CreatePost {...this.props}
                            post={this.state.post}
                            isUpdate={this.state.isUpdate}
                            handleInput={this.handleInput}
                            handleAddNewPost={this.handleAddNewPost}
                            />  
            </div>
    )}      
}

const mapStateToProps = state => ({
    
});

export default connect( mapStateToProps,
                        {addNewPost})(CreatePostView);