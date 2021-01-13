import React, {Component} from 'react'
import Hello from './components/Hello/Hello'
// 组件文件以 index 命名可以不写文件名
import Welcome from './components/Welcome'

export default class App extends Component {
    render() {
        return (
            <div>
                <Hello/>
                <Welcome/>
            </div>
        )
    }
}