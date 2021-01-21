import React, { Component } from 'react'

export default class Count extends Component {

  increase = () => {
    const {value} = this.selectNode
    this.props.increase(value * 1)
  }
  decrease = () => {
    const {value} = this.selectNode
    this.props.decrease(value * 1)
  }
  increaseIfOdd = () => {
    const {value} = this.selectNode
    if (this.props.count % 2 !== 0) {
      this.props.increase(value * 1)
    }
  }
  increaseAsync = () => {
    const {value} = this.selectNode
    this.props.increaseAsync(value * 1, 500)
  }

  render() {
    return (
      <div>
        <h2>Sum：{this.props.count}</h2>
        操作数：
        <select ref={c => this.selectNode = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;&nbsp;
        <button onClick={this.increase}>加</button>&nbsp;&nbsp;
        <button onClick={this.decrease}>减</button>&nbsp;&nbsp;
        <button onClick={this.increaseIfOdd}>和为奇数再加</button>&nbsp;&nbsp;
        <button onClick={this.increaseAsync}>异步加</button>
      </div>
    )
  }
}
