import Button from './Button'
import Router from 'next/router'
import { delete as _delete } from 'axios'

class Post extends React.Component { 

  delete = () => {
    const { id } = this.props
    _delete(`http://localhost:5000/api/posts/${id}`)
    window.location.reload()
  }

  render() {

    const { title, contents } = this.props

    return (
      <div className="post-container">
        <h1>{title}</h1>
        <div className="close">
          <Button 
            onClick={this.delete}
            p='1px' 
            ls='initial'
          >
            x
          </Button>
        </div>
        <hr />
        <p>{contents}</p>
        <style jsx>{`
          .post-container {
            border: 2px solid #fff;
            padding: 20px;
            margin: 20px 0;
            position: relative;
          }

          .close {
            position: absolute;
            top: 0;
            right: 0;
          }

          h1 {
            font-size: 20px;
          }
        `}</style>
      </div>
    )
  }
}


export default Post
