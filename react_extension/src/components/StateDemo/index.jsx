import React, { Component } from 'react'

export default class StateDemo extends Component {

  state = {
    sum: 0
  }

  add = () => {
    // const {sum} = this.state
    // this.setState({
    //   sum: sum + 1
    // }, () => {
    //   console.log('回调内输出：', this.state.sum)
    // })
    // console.log('非回调输出：', this.state.sum)

    this.setState((state, props) => {
      return {
        sum: state.sum + 1
      }
    }, () => {
      console.log('回调内输出：', this.state.sum)
    })
  }

  render() {
    return (
      <div>
        <h2>当前结果：{this.state.sum}</h2>
        <button onClick={this.add}>点我加一</button>
      </div>
    )
  }
}
