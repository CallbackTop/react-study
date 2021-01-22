import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Demo from './components/PureComponentDemo'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Demo/>
        </BrowserRouter>
      </div>
    )
  }
}
