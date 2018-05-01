import React from 'react'
import ReactDOM from 'react-dom'
import { Observable } from 'rxjs/Rx'
import 'rxjs/ajax'
import 'rxjs/add/operator/map'
import App from './App'

const post$ = Observable
  .ajax('http://localhost:5000/api/posts')
  .map((xhr) => xhr.response)

ReactDOM.render(<App post$={post$} />, document.getElementById('root'))
