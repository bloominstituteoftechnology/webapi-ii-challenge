import React from 'react';
import { connect } from 'react-redux';

import { getNoteList } from '../store/actions';

import NoteList from '../components/NoteList.js';

class PostsView extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         notesList: this.props.noteList,
    //         actionTookPlace: this.props.actionTookPlace
    //     }
    // }

    componentDidMount() {    
        this.props.getPosts();
    }

    // handleActionTookPlace(){
    //     if (this.props.actionTookPlace !== this.state.actionTookPlace) {
    //         this.props.getNoteList();
    //     }
    // }

    render() { 
        return ( 
            <div className="posts-view-container"
                 >  
                 {this.handleActionTookPlace()}      
                {/* {console.log("Props: "+this.props.actionTookPlace)}
                {console.log("State: "+this.state.actionTookPlace)} */}
                <Posts {...this.props}/>
            </div>     
        );
    }
}

const mapStateToProps = state => ({
    postList: state.posts
    // actionTookPlace: state.actionTookPlace
});

export default connect(mapStateToProps, { getPosts })(PostsView);
