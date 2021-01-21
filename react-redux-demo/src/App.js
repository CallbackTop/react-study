import React, { Component } from 'react'
// import Count from './container/Count'
import SimpleCount from './container/SimpleCount'
import Person from './container/Person'

export default class App extends Component {
  render() {
    return (
      <div>
        <SimpleCount />
        <hr/>
        <Person/>
      </div>
    )
  }
}
