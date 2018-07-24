const Post = ({ title, contents }) =>
  <div>
    <h1>{title}</h1>
    <hr />
    <p>{contents}</p>
    <style jsx>{`
      div {
        border: 2px solid #fff;
        padding: 20px;
        margin: 20px 0;
      }

      h1 {
        font-size: 20px;
      }
    `}</style>
  </div>


export default Post
