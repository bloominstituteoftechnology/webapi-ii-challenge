import React from 'react'
import axios from 'axios';
import Post from './Post';
import styled from 'styled-components'

const ContainerDiv = styled.div`
	max-width: 400px;
	width: 100%;
	margin: 20px auto;
`;
const CreateDiv = styled.div`
	border: solid black 1px;
`;

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 90%;
	margin: 10px 5%;
`;

const CreateBtn = styled.button`
	margin-left: 5%;
`

class PostList extends React.Component {
	constructor(){
		super();
		this.state = {
			posts: [],
			createTitle: '',
			createContents: '',
		};
	}

	componentDidMount() {
    axios
      .get("http://localhost:5555/api/posts")
      .then(response => {
        this.setState({posts: response.data });
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  resetState = () => {
  	axios
      .get("http://localhost:5555/api/posts")
      .then(response => {
        this.setState({posts: response.data });
      })
      .catch(err => {
        console.log(err)
      })
  }

  createPost = () => {
  	const newPost = {
  		title: this.state.createTitle,
  		contents: this.state.createContents,
  	}
  	axios
  		.post(`http://localhost:5555/api/posts/`, newPost)
  		.then(response => {
  			console.log(response.data)
  			console.log("post response: ", response);
  			this.setState({
  				createTitle: '',
  				createContents: '',
  			})
  			this.resetState()
  		})
  		.catch(error => console.log(error));
  }

	render(){
		return (
			<ContainerDiv>
				{this.state.posts.map(post => (
					<Post post={post} key={post.id} resetState={this.resetState}/>
				))}
				<CreateDiv>
					<CreateForm>
						<input
							type="text"
							placeholder="Post Title"
							onChange={this.handleChange}
							name="createTitle"
							value={this.state.createTitle}
						/>
						<input
							type="text"
							placeholder="Post Contents"
							onChange={this.handleChange}
							name="createContents"
							value={this.state.createContents}
						/>
					</CreateForm>
					<CreateBtn onClick={this.createPost}>Create New Post</CreateBtn>
				</CreateDiv>
			</ContainerDiv>
		)
	}
}

export default PostList
