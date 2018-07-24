import { get } from 'axios'
import Container from '../components/Container'
import Post from '../components/Post'

const Index =  ({ posts }) => 
  <Container>
    {posts.map(post =>
      <Post 
        key={post.id}
        title={post.title}
        contents={post.contents}
      />
    )}
  </Container>

Index.getInitialProps = async ({ req }) => {
  const { data: posts } = await get('http://localhost:5000/api/posts')
  return { posts }
}

export default Index
