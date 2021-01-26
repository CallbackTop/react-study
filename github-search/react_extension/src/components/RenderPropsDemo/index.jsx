import React, { PureComponent } from 'react'

import StateHookDemo from '../StateHook'

export default class RenderPropsDemo extends PureComponent {
  render() {
    return (
      <div>
        <h2>这是 RenderPropsDemo 组件</h2>
        {/* 通过传入一个函数返回要插入的组件 */}
        <A render={() => <StateHookDemo/>}/>
      </div>
    )
  }
}

/**
 * 使用 this.props.render() 在 JSX 中预留要插入其他 DOM 的位置
 * 类似 Vue 的 Slot 技术
 * 函数名 render 是自定义的，改什么名字都可以
 */
class A extends PureComponent {
  render() {
    return (
      <div>
        <h2>这是 A 组件</h2>
        {this.props.render()}
      </div>
    )
  }
}
