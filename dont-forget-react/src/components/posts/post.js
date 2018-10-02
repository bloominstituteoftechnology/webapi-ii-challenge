import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component {
    state={
        id: '',
    }

    componentDidMount(){
        const postID = this.props.match.params.id;
        this.setState({id: postID});
        console.log(postID);
        this.getPost(postID)
    }

    getPost= (postID) => {
        axios
        .get(``)
    }

}