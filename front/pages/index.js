import { get } from 'axios'
import { Container, FlexCenter } from '../components/Containers'
import Post from '../components/Post'
import Button from '../components/Button'
import Link from 'next/link'

const Index =  ({ posts }) => 
  <>
    <Container>
      {posts.map(post =>
        <Post 
          id={post.id}
          key={post.id}
          title={post.title}
          contents={post.contents}
        />
      )}
    </Container>
    <FlexCenter>
      <Link href='/new'>
        <Button>New Post</Button>
      </Link>
    </FlexCenter>
  </>

Index.getInitialProps = async ({ req }) => {

  try {
   
    const { data: posts } = await get('http://localhost:5000/api/posts')
    return posts ? { posts: posts.reverse() } : { posts: [] } 

  } catch(e) {
    
    console.log('error:', e)
  
  }

}

export default Index
