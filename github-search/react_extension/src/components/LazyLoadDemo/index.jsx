import React, { Component, lazy, Suspense } from 'react'
import {NavLink, Route} from 'react-router-dom'

import Loading from './Loading'

// 组件懒加载
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

export default class LazyLoadDemo extends Component {
  render() {
    return (
      <div>
        <ul>
          <NavLink to="/home">Home</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to="/about">About</NavLink>
        </ul>

        <hr/>
        {/* 懒加载需要对路由包裹 Suspense 做兜底，就是在组件加载不回来的时候显示的组件，这个组件必须同步加载 */}
        <Suspense fallback={<Loading/>}>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Suspense>
      </div>
    )
  }
}
