import React, { Component } from 'react'

import store from '../../redux/store'
import {
  createIncreaseAction, 
  createDecreaseAction,
  createIncreaseAsyncAction
} from '../../redux/count_action'

export default class Count extends Component {

  componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  }


  increase = () => {
    const {value} = this.selectNode
    store.dispatch(createIncreaseAction(value * 1))
  }
  decrease = () => {
    const {value} = this.selectNode
    store.dispatch(createDecreaseAction(value * 1))
  }
  increaseIfOdd = () => {
    const {value} = this.selectNode
    const sum = store.getState()
    if (sum % 2 !== 0) {
      store.dispatch(createIncreaseAction(value * 1))
    }
  }
  increaseAsync = () => {
    const {value} = this.selectNode
    store.dispatch(createIncreaseAsyncAction(value * 1, 500))
  }

  render() {
    return (
      <div>
        <h2>Sum：{store.getState()}</h2>
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
