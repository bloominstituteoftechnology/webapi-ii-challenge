import React from 'react';
import PostCardModal from './PostCardModal';
import PostCardEditModal from './PostCardEditModal';
import './PostCard.css';

class PostCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayModal: false,
            displayEditModal: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            displayModal: !prevState.displayModal
        }))
    }

    toggleEditModal = () => {
        this.setState(prevState => ({
            displayModal: !prevState.displayModal,
            displayEditModal: !prevState.displayEditModal
        }))
    }

    render() {
        return (
            <div className="post-card-wrapper" onDoubleClick={this.toggleModal}>
                <blockquote className="post-card-title">{this.props.post.title}</blockquote>
                <h3 className="post-card-contents">{this.props.post.contents}</h3>
                {this.state.displayModal ? <PostCardModal id={this.props.post.id} toggleModal={this.toggleModal} toggleEditModal={this.toggleEditModal} deletePost={this.props.deletePost}/> : null}
                {this.state.displayEditModal ? <PostCardEditModal id={this.props.post.id} toggleModal={this.toggleModal} toggleEditModal={this.toggleEditModal}/> : null}
            </div>
        );
    }
}

export default PostCard;