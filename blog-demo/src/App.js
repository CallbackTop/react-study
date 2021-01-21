import React, { Component } from 'react'
import store from './redux/store'
import Calculator from './containers/Calculator'

export default class App extends Component {
  render() {
    return (
      <div>
        <Calculator />
      </div>
    )
  }
}
