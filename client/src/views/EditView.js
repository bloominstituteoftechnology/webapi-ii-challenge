import React from 'react';
import {connect} from 'react-redux';
import EditPost from '../components/EditPost';
import {editPost}  from '../store/actions';

class EditView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:{ ...this.props.postOnProps
            }
        }
    }

    handleInput = event =>{
        event.preventDefault();
        this.setState({ ...this.state,
                        post:{...this.state.post, [event.target.name]: event.target.value}});
    }

    handleEditPost = event => {
        event.preventDefault();
        // console.log("crash!!");
        this.props.editPost(this.state.post);
        // window.location.reload();
        this.props.history.push("/");
    }

    render(){
        // console.log(this.props.postOnProps);
        return (
            <div className="create-view-container">
                <EditPost {...this.props}
                            post={this.state.post}
                            handleInput={this.handleInput}
                            handleEditPost={this.handleEditPost} />

            </div>
    )}      
}

const mapStateToProps = state => ({
    noteOnProps: state.note
});

export default connect( mapStateToProps,
                        {editPost })(EditView);