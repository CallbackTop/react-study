import React, { PureComponent } from 'react'

import Child from './Child'

export default class ErrorBoundaryDemo extends PureComponent {

  state = {
    childLoadSuccess: true
  }
  
  /**
   * 子组件的错误只能在父组件里处理，并且只能捕获子组件生命周期函数内发
   * 生的错误，通常用于捕获 render() 中发生的渲染错误
   */
  static getDerivedStateFromError(error) {
    console.log(error)
    return {
      childLoadSuccess: false
    }
  }

  /**
   * 当组件发生异常时触发，通常用于向后台服务器报告错误
   */
  componentDidCatch() {
    console.log('哦豁，日怪了')
  }

  render() {
    return (
      <div>
        <h2>这是 ErrorBoundaryDemo 组件</h2>
        {
          this.state.childLoadSuccess ? <Child/> : <h4>Child组件发生了异常  </h4>
        }
      </div>
    )
  }
}
