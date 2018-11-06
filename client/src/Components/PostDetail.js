import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const WrapperDiv = styled.div`

`
const Title = styled.div`
    font-size:2rem;
`
const Contents = styled.div`
    font-size:1.6rem;
`

class PostDetail extends React.Component{
    constructor()
    {
        super();
        this.state = {
            id:'',
            title:'',
            contents:'',
            created:'',
            updated:'',
        };
    }

    componentDidMount(){
        Axios.get(`http://localhost:5050/api/posts/${this.props.match.params.id}`)
             .then((response)=>{
                    this.setState({
                                      id:response.data.id,
                                      title:response.data.title,
                                      contents:response.data.contents,
                                      created:response.data.created_at,
                                      updated:response.data.updated_at
                                  })
            })
            .catch(error =>console.log("An Error has occurred.",error))
    }
    render(){
        return(
            <WrapperDiv>
                <p>{this.state.id}</p>
                <Title>{this.state.title}</Title>
                <Contents>{this.state.contents}</Contents>
                <p>{this.state.created}</p>
                <p>{this.state.updated}</p>
            </WrapperDiv>
        )
    
    }

}


export default PostDetail;
