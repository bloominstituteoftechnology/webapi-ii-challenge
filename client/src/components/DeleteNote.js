import axios from 'axios';

const DeleteNote = (id) => {
axios
  .delete(`http://localhost:5001/api/posts/${id}`)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  });
}

export default DeleteNote;