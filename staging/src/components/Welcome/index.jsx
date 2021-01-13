import React, { Component } from "react";

// 为了避免样式冲突，将 css 文件加上 .module 表示模块化
// 然后使用 import xxx from xxx.module.css 语法引入
// 使用样式时使用 {xxx.样式名} 来调用
import welcome from  './index.module.css'

export default class Welcome extends Component {
    render() {
        return <h2 className={welcome.title}>Welcome</h2>
    }
}