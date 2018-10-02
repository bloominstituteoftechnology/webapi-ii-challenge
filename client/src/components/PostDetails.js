import React from 'react';
import {fetchSinglePost, deletePost} from '../actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

class PostDetails extends React.Component {
    componentDidMount(){
        this.props.fetchSinglePost(this.props.match.params.id);
    }

    handleDelete = (event) => {
        event.preventDefault();

        this.props.deletePost(this.props.currentNote.id);

       

        this.props.history.push('/');
        
    }

    render(){
        return(
            <div>
                This is the note details view
                <h1>{this.props.currentNote.title}</h1>
                <p>{this.props.currentNote.contents}</p>
                <button onClick={this.handleDelete}>DELETE</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetching_single: state.fetching_single,
        fetched_single: state.fetched_single,
        currentNote: state.currentNote
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchSinglePost,
    deletePost,
})(PostDetails));
