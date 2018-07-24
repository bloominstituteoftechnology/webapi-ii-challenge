import { get } from 'axios'
import Post from '../components/Post'

const Index =  ({ posts }) => 
  posts.map(post =>
    <Post 
      key={post.id}
      title={post.title}
      contents={post.contents}
    />
  )

Index.getInitialProps = async ({ req }) => {
  const { data: posts } = await get('http://localhost:5000/api/posts')
  return { posts }
}

export default Index
