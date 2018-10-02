import React from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../store/actions';

import Posts from '../components/Posts.js';

class PostsView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            posts: this.props.posts,
            actionTookPlace: this.props.actionTookPlace
        }
    }

    componentDidMount() {    
        this.props.getPosts();
    }

    handleActionTookPlace(){
        if (this.props.actionTookPlace !== this.state.actionTookPlace) {
            this.props.getPosts();
        }
    }

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
    posts: state.posts,
    actionTookPlace: state.actionTookPlace
});

export default connect(mapStateToProps, { getPosts })(PostsView);
