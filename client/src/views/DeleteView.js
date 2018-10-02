import React from 'react';
import {connect} from 'react-redux';
import {deletePost}  from '../store/actions';
import '../App.css';

class DeleteView extends React.Component {

    handleDeletePost = event => {
        event.preventDefault();
        this.props.deletePost(this.props.postOnProps['id']);    
        this.props.history.push("/");
    }

    render(){
        return (
            <div className="delete-class">
                <h2>Are you sure you want to delete this?</h2>
                <div className="delete-buttons">
                    <button className="delete-yes-button"
                            onClick={
                                this.handleDeletePost
                            }>Delete</button>
                    <button className="delete-no-button"
                            onClick={()=>
                               this.props.deleteModal.style.display ="none"
                            }>No</button>  
                </div>   
            </div>
    )}      
}

const mapStateToProps = state => ({
    postOnProps: state.post
});

export default connect( mapStateToProps,{deletePost})(DeleteView);