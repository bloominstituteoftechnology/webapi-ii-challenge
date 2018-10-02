import React from 'react';
import {fetchSinglePost} from '../actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

class PostDetails extends React.Component {
    componentDidMount(){
        this.props.fetchSinglePost(this.props.match.params.id);
    }

    render(){
        return(
            <div>
                This is the note details view
                <h1>{this.props.currentNote.title}</h1>
                <p>{this.props.currentNote.contents}</p>
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
    fetchSinglePost
})(PostDetails));
