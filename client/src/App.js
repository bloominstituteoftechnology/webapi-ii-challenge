import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'

class App extends Component {
  state = {
    posts: [],
  }
  
  render() {
    return (
      <div className="App">
        <h1>App Class Component</h1>
        <button>GET request</button>
        <GlobalStyle />
      </div>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0;
    font-size: 62.5%;
    border: 1px solid black;
    text-align: center;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
`

export default App
