import React from 'react';
import { connect } from 'react-redux';
import { getSinglePost } from './../actions';


class Post extends React.Component {
    
    componentDidMount() {
        this.props.getSinglePost(this.props.match.params.id)
    }

    render() {
    return(
        <div>
            <h3>{this.props.post.title}</h3>
            <p>{this.props.post.contents}</p>
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        post: state.post
    }
}

const mapActionsToProps = {
    getSinglePost: getSinglePost
}

export default connect(mapStateToProps, mapActionsToProps)(Post);