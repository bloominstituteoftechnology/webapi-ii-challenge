import React from 'react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newContent: ''
        }
    }
    render() {
        return (
            <div>
                <div>
                    <strong>{`${this.props.id}. ${this.props.title}`}</strong>
                    <p>{this.props.contents}</p>
                </div>
            </div>
        )
    }
}

export default Post;