import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {

  getStudents = () => {
    axios.get('http://localhost:3000/students').then(
      response => {
        console.log('成功')
        console.log(response.data)
      },
      error => {
        console.log('失败')
        console.log(error)
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.getStudents}>获取学生信息</button>
      </div>
    )
  }
}
