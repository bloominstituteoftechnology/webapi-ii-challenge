import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  state = {
    list: []
  }

  componentDidMount(){
     axios.get('http://localhost:9001/posts/').then(res => {
       console.log(res)
        this.setState({
          list: res.data
        })

    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    console.log(this.state)
    return (
      <AppDiv>
        <h2>list from server</h2>
        <div className="allItems">
          {this.state.list.map(item => {
            return (
              <div className="item" key={item.id}>
                <h2>{item.title}</h2>
                <p>contents: {item.contents}</p>
                <p> id: {item.id}</p>
              </div>
            )
          })}
        </div>

      </AppDiv>



    );
  }
}

export default App;

const AppDiv = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  width: 97%;
  padding: 15px;
  flex-wrap: wrap;
  .allItems {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item {
    width: 15%;
    padding: 10px;
    margin: 10px;
    border: 1px solid green;
  }
`;
