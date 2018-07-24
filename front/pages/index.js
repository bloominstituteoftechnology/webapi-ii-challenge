import { get } from 'axios'

const Index =  ({ posts }) => 
  posts.map(post =>
    <div key={post.id}>{post.title}</div>
  )

Index.getInitialProps = async ({ req }) => {
  const { data: posts } = await get('http://localhost:5000/api/posts')
  return { posts }
}

export default Index
