/**
 * 将容器组件和 UI 组件定义在一个文件中
 * 只暴露容器组件
 * 不暴露 UI 组件
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  createIncreaseAction,
  createDecreaseAction,
  createIncreaseAsyncAction
} from '../../redux/actions/count'

class SimpleCount extends Component {
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
        <h2>Sum：{this.props.count}，下方人数：{this.props.totalPerson}</h2>
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

export default connect(
  state => ({count: state.count, totalPerson: state.persons.length}),
  {
    increase: createIncreaseAction,
    decrease: createDecreaseAction,
    increaseAsync: createIncreaseAsyncAction
  }
)(SimpleCount)
