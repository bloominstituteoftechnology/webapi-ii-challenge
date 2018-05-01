import React from 'react';
import axios from 'axios';
class Post extends React.Component {
    constructor(props){
        super(props)
    }

    // removePost = (event) => {
    //
    //     axios.delete(`http://localhost:5000/api/posts/${event.target.id}`)
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error =>{
    //             console.log(error.error);
    //         })
    // };

    render() {
        return (
            <div>
                <li key={this.props.post.id}>
                    <a href="#">

                        <h2>{this.props.post.title}</h2>
                        <br/>
                        <p>{this.props.post.contents}</p>
                        <button id={this.props.post.id} onClick={this.props.click}>Delete</button>
                    </a>
                </li>
            </div>
        );
    }
}
export default Post;