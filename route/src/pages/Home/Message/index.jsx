import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import DetailParams from './DetailParams'
import DetailSearch from './DetailSearch'
import DetailState from './DetailState'

const messages = [
  {id: '1', title: '消息1', content: '我爱你中国'},
  {id: '2', title: '消息2', content: '我爱你世界'},
  {id: '3', title: '消息3', content: '我爱你地球'}
]

export default class Message extends Component {

  state = {
    // 控制传参模式
    mode: 'state' // params、search、state
  }

  pushShow = (mode, id, title) => {
    if (mode === 'params') {
      this.props.history.push(`/home/message/detailParams/${id}/${title}`)
    }
    if (mode === 'search') {
      this.props.history.push(`/home/message/detailSearch/?id=${id}&title=${title}`)
    }
    if (mode === 'state') {
      this.props.history.push('/home/message/DetailState', {id: id, title: title})
    }
  }

  replaceShow = (mode, id, title) => {
    if (mode === 'params') {
      this.props.history.replace(`/home/message/detailParams/${id}/${title}`)
    }
    if (mode === 'search') {
      this.props.history.replace(`/home/message/detailSearch/?id=${id}&title=${title}`)
    }
    if (mode === 'state') {
      this.props.history.replace('/home/message/DetailState', {id: id, title: title})
    }
  }

  render() {
    const {mode} = this.state
    return (
      mode === 'params' ?
      <div>
        <ul>
          {
            messages.map((msg) => {
              return (
                <li key={msg.id}>
                  <Link to={`/home/message/detailParams/${msg.id}/${msg.title}`}>消息{msg.id}</Link>
                  &nbsp;<button onClick={() => this.pushShow('params', msg.id, msg.title)}>Push</button>
                  &nbsp;<button onClick={() => this.replaceShow('params', msg.id, msg.title)}>Replace</button>
                </li>
              )
            })
          }
        </ul>
        <Route path="/home/message/detailParams/:id/:title" component={DetailParams} />
      </div>

      : mode === 'search' ?

      <div>
        <ul>
          {
            messages.map((msg) => {
              return (
                <li key={msg.id}>
                  <Link to={`/home/message/detailSearch/?id=${msg.id}&title=${msg.title}`}>消息{msg.id}</Link>
                  &nbsp;<button onClick={() => this.pushShow('search', msg.id, msg.title)}>Push</button>
                  &nbsp;<button onClick={() => this.replaceShow('search', msg.id, msg.title)}>Replace</button>
                </li>
              )
            })
          }
        </ul>
        <Route path="/home/message/detailSearch" component={DetailSearch} />
      </div>
      
      :

      <div>
        <ul>
          {
            messages.map((msg) => {
              return (
                <li key={msg.id}>
                  <Link to={{pathname: '/home/message/DetailState', state: {id: msg.id, title: msg.title}}}>消息{msg.id}</Link>
                  &nbsp;<button onClick={() => this.pushShow('state', msg.id, msg.title)}>Push</button>
                  &nbsp;<button onClick={() => this.replaceShow('state', msg.id, msg.title)}>Replace</button>
                </li>
              )
            })
          }
        </ul>
        <Route path="/home/message/DetailState" component={DetailState} />
      </div>
    )
  }
}
