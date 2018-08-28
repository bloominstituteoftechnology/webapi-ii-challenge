import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const url = 'http://localhost:3333/api/posts';

class App extends Component {
  state = {
    data: [],
    idInputDelete: '',
    idInputEdit: '',
    titleEdit: '',
    contentsEdit: '',
    titleAdd: '',
    contentsAdd: '',
    tryStuff: false
  }

  handleOnChange = e => this.setState({[e.target.name]: e.target.value})

  componentDidMount() {
    axios.get(url)
    .then(response => {
      this.setState({data: response.data});
    })
    .catch(err => {
      console.log('Error', err);
    });
  }

  deleteItem = (e) => {
    //e.preventDefault();
    let id = this.state.idInputDelete;
    axios.delete(`${url}/${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
    this.setState({idInputDelete: ''})
  }

  editItem = (e) => {
    //e.preventDefault();
    let id = this.state.idInputEdit;
    let body = {
      title: this.state.titleEdit,
      contents: this.state.contentsEdit
    }
    axios.put(`${url}/${id}`, body)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({idInputEdit: '', titleEdit: '', contentsEdit: ''})
  }

  addItem = e => {
    //e.preventDefault();
    let body = {
      title: this.state.titleAdd,
      contents: this.state.contentsAdd
    }
    axios.post(url, body)
      .then(res => {
        console.log(res, 'HELLLo')
      })
      .catch(err => console.log(err));
    this.setState({titleAdd: '', contentsAdd: ''})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section>
          <form onSubmit={this.deleteItem}>
            <label htmlFor="idInputDelete"></label>
            <input 
              type="number"
              id="idInputDelete"
              name="idInputDelete"
              value={this.state.idInputDelete}
              onChange={this.handleOnChange}
            />
            <button>Delete</button>
          </form>
          <br/>
          <form onSubmit={this.editItem}>
            <label htmlFor="idInputEdit"></label>
            <input 
              type="number"
              placeholder="ID"
              id="idInputEdit"
              name="idInputEdit"
              value={this.state.idInputEdit}
              onChange={this.handleOnChange}
            />
            <label htmlFor="titleEdit"></label>
            <input 
              type="text"
              placeholder="Title"
              id="titleEdit"
              name="titleEdit"
              value={this.state.titleEdit}
              onChange={this.handleOnChange}
            />
            <label htmlFor="contentsEdit"></label>
            <input 
              type="text"
              placeholder="Contents"
              id="contentsEdit"
              name="contentsEdit"
              value={this.state.contentsEdit}
              onChange={this.handleOnChange}
            />
            <button>Edit</button>
          </form>
          <br/>
          <form onSubmit={this.addItem}>
            <label htmlFor="titleAdd"></label>
            <input 
              type="text"
              placeholder="Title"
              id="titleAdd"
              name="titleAdd"
              value={this.state.titleAdd}
              onChange={this.handleOnChange}
            />
            <label htmlFor="contentsAdd"></label>
            <input 
              type="text"
              placeholder="Contents"
              id="contentsAdd"
              name="contentsAdd"
              value={this.state.contentsAdd}
              onChange={this.handleOnChange}
            />
            <button>Add</button>
          </form>
        </section>
        <main>
          <ul>
            {this.state.data.length === 0 || this.state.tryStuff ?
              <h1>Loading...</h1>
              :
              this.state.data.map((item, index) => <div key={index}>{item.id} - {item.title}</div>)
            }
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
