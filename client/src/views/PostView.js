import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

import { getNote, deleteNote } from '../store/actions';
// import DeleteView from './DeleteView';

class PostView extends React.Component {
    
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    // deleteModal = document.getElementsByClassName('delete-modal');

    render() { 
        return (
            <div>
                {/* <div className="edit-delete-links">
                    <h3 onClick={()=>{this.props.history.push(`/edit/${this.props.noteOnProps['_id']}`)}}>Edit</h3>
                    <h3 onClick={()=>{
                        this.deleteModal[0].style.display ="block"   
                        }}>Delete</h3> 
                </div> */}
                
                <div className="display-panel">
                    <h2 className="post-title">{this.props.postOnProps.title}</h2>
                    <p className="post-textBody">{this.props.postOnProps.contents}</p>
                </div>
                
                {/* <div className="delete-modal">
                    <div className="delete-modal-popup">
                        <DeleteView {...this.props}
                                    deleteModal={this.deleteModal[0]}/>
                    </div>  
                </div> */}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    postOnProps: state.post
});

export default connect(mapStateToProps, { getNote, deleteNote })(PostView);
