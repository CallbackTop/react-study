import React, { Component } from 'react'
import './index.css'

const NameContext = React.createContext()

export default class ContextDemo extends Component {

  state = {
    name: 'zidu',
    age: 27
  }

  render() {
    const {name, age} = this.state
    return (
      <div className="parent">
        <h2>A 组件</h2>
        <h2>名称：{name}</h2>
        <NameContext.Provider value={{name, age}}>
          <B name={name}/>
        </NameContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h2>B 组件</h2>
        <h2>使用 props 接收父组件名称：{this.props.name}</h2>
        <C/>
      </div>
    )
  }
}

function C() {

  return (
    <div className="grand">
      <h2>C 组件</h2>
      <h2>使用 Consumer 标签接收名称：
        <NameContext.Consumer>
          {
            value => {
              return value.name
            }
          }
        </NameContext.Consumer>
      </h2>
      <D/>
    </div>
  )

}

class D extends Component {

  static contextType = NameContext

  render() {
    return (
      <div className="grand-grand">
        <h2>D 组件</h2>
        <h2>使用 contextType 接收名称：{this.context.name}</h2>
      </div>
    )
  }
}

