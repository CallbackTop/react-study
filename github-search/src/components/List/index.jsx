import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import Item from '../Item'
import './index.css'

export default class List extends Component {

  state = {
    items: [],
    isFirst: true,
    isLoading: false,
    err: ''
  }

  componentDidMount() {
    this.searchActionToken = PubSub.subscribe('searchAction', (msg, data) => {
      this.setState(data)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.searchActionToken)
  }

  render() {
    const {items, isFirst, isLoading, err} = this.state
    return (
      <div className="row">
        {
          // jsx 里面只能写表达式，不能写 if 判断
          // 这里使用 三元表达式 代替 if
          isFirst ? <h2>欢迎使用</h2> :
          isLoading ? <h2>数据加载中</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> :
          items.map((item) => {
            return <Item {...item} key={item.id}/>
          })
        }
      </div>
    )
  }
}
