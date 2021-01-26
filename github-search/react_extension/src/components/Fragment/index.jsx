import React, { Component, Fragment } from 'react'

export default class FragmentDemo extends Component {
  render() {
    return (
      <Fragment>
        <h2>Fragment 标签在编译时会被丢弃掉，可以避免多组件时嵌套出太多层 div</h2>
        <h2>Fragment 可以接收一个 key 属性，这在遍历的时候可以用，避免产生太多外层元素</h2>
      </Fragment>
    )
  }
}
