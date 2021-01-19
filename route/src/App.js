import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 对 NavLink 进行封装，避免重复书写样式等内容，标签体的内容会自动收集到 props 中，key 为 children */}

              {/* 这里的 to 和下面 Route 里的 path 不同，但还是能匹配上。因为模糊匹配会把路径拆开，从头开始匹配，只要有一个匹配上就可以 */}
              <MyNavLink to="/about">About</MyNavLink>
              <MyNavLink to="/home">Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 使用 Switch 包裹 Route 后，当路径和组件第一次匹配成功后就不再往下匹配 */}
                <Switch>
                  {/* 组件在 Route 中使用就是「路由组件」，会默认收到路由传递的 props */}
                  <Route path="/about"  component={About} />
                  <Route path="/home"  component={Home} />
                  {/* 当前面所有路由都匹配不上时走这里 */}
                  <Redirect to="/home" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}