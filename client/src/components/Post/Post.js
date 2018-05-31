import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Post Title Goes Here!',
            contents: 'Here Your Post Contents'
        }
    }

    componentDidMount() {
        if(this.props.post)
            this.setState({title: this.props.post.title, contents: this.props.post.contents});
    }

    render() { 
        return (
            <div className={this.props.className}>
                <h2>{this.state.title}</h2>
                <p>{this.state.contents}</p>
            </div>
        )
    }
}
 
export default Post