import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {

  render() {
    return (
      // NavLink 相比于 Link 可在被点击时添加样式名
      // 标签体内容会被自动作为标签属性，key 为 children
      // children="About"
      // 所以这里直接展开 props 即可
      <NavLink activeClassName="choose" className="list-group-item" {...this.props} />
    )
  }
}
