import React, {Component} from 'react';
import styled from 'styled-components';

const PostView = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 20px 20px 20px;
    margin: 10px;
    border: 1px solid #896f4c;
    border-radius: 5px;
    background: rgba(89, 69, 45, 0.7);
    max-width: 550px;
    width: 100%;

    > h3 {
        color: #e7d9bd;
    }

    > p {
         color: #e7d9bd;
    }
`
const DateWrap = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #a0855e;
    > p {
        font-size: 10px;
        color: #f3ead8;
        
    }

`
class Post extends Component {
    render() { 
        return ( 
            <PostView>
                <DateWrap>
                    <p>Created: {this.props.created}</p>
                    <p>Updated: {this.props.updated}</p>
                </DateWrap>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.contents}</p>
            </PostView>
         );
    }
}
 
export default Post;