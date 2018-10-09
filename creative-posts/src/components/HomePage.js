import React from 'react';


class HomePage extends React.Component {
  constructor(props) {
super(props);
console.log(props.posts)
  }
render(){
return(
  <div className="App">

    {this.props.posts.map(post => {
   return(

   <div key ={post._id} className=''>

   <h3>{post.title}</h3>
   <hr/>
   <p> {post.content}</p>

   </div>

   )
 })}

  </div>
)

};




}
export default HomePage
