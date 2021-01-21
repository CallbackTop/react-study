import React, { Component } from 'react'
import {connect} from 'react-redux'
import {increase, decrease} from '../../redux/actions/calculator'

class Calculator extends Component {

  handleIncrease = () => {
    const value = this.node.value
    this.props.increase(value * 1)
  }

  handleDecrease = () => {
    const value = this.node.value
    this.props.decrease(value * 1)
  }

  render() {
    return (
      <div>
        {/* 从 props 上取值 */}
        <h2>当前计算结果：{this.props.result}</h2>
        <input ref={c => this.node = c} type="text" placeholder="操作数"/>&nbsp;&nbsp;
        <button onClick={this.handleIncrease}>加</button>&nbsp;&nbsp;
        <button onClick={this.handleDecrease}>减</button>
      </div>
    )
  }
}

export default connect(
  state => ({result: state.result}),
  {
    increase, // 这里用了对象简写语法
    decrease,
  }
)(Calculator)