import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'

export default class Header extends Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired
  }

  handleAddItem = (event) => {
    const {keyCode, target} = event
    if (keyCode !== 13) {
      return
    }
    if (target.value.trim() === '') {
      alert('不能为空')
      return
    }
    // 调用父组件通过 props 传过来的函数提交数据
    this.props.addItem({id: nanoid(), name: target.value, checked: false})
    // 清空输入框
    target.value = ''
  }

  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleAddItem} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}
