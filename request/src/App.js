import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {

  getStudents = () => {
    axios.get('http://localhost:3000/api/v1/students').then(
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

  getCars = () => {
    axios.get('http://localhost:3000/api/v2/cars').then(
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
        <button onClick={this.getCars}>获取车辆信息</button>
      </div>
    )
  }
}
