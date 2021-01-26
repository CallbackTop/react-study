import React, { Component } from 'react'

export default class A extends Component {

  state = {
    name: 'zidu',
    age: 27
  }

  changeName = () => {
    this.setState({
      name: 'CallbackZidu'
    })
  }

  render() {
    console.log('组件 A 发生渲染')
    const {name, age} = this.state
    return (
      <div>
        <h2>组件 A</h2>
        <h2>名字：{name}</h2>
        <br/>
        <button onClick={this.changeName}>改名</button>
        <hr/>
        <B age={age}/>
      </div>
    )
  }
}


class B extends Component {
  render() {
    console.log('组件 B 发生渲染')
    return (
      <div>
        <h2>组件 B</h2>
        <h2>年龄：{this.props.age}</h2>
      </div>
    )
  }
}

