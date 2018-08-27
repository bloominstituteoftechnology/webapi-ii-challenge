import React, {Component} from 'react';

class Post extends Component {
    render() { 
        return ( 
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.contents}</p>
                <p>{this.props.created}</p>
                <p>{this.props.updated}</p>
            </div>
         );
    }
}
 
export default Post;