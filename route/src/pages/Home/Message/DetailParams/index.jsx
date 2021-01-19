import React, { Component } from 'react'

const messageList = [
  {id: '1', content: '我爱你中国'},
  {id: '2', content: '我爱你世界'},
  {id: '3', content: '我爱你地球'}
]

export default class DetailParams extends Component {
  render() {
    const {id, title} = this.props.match.params
    const message = messageList.find((item) => {
      return item.id === id
    })
    return (
      <ul>
        <li>ID：{id}</li>
        <li>标题：{title}</li>
        <li>内容：{message.content}</li>
      </ul>
    )
  }
}
