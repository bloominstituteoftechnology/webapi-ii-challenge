import React from 'react'
import ReactDOM from 'react-dom'
import { Observable } from 'rxjs/Rx'
import 'rxjs/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import App from './App'

const post$ = Observable.ajax({
  url: 'http://localhost:5000/api/posts',
  crossDomain: true,
  createXHR: () => new XMLHttpRequest()
}).map((xhr) => xhr.response)

ReactDOM.render(<App post$={post$} />, document.getElementById('root'))
