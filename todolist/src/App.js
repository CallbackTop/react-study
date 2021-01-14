import React, { Component } from 'react'

import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

import './App.css'

export default class App extends Component {

  state = {
    todos: [
      {id: 1, name: '吃饭', checked: true},
      {id: 2, name: '睡觉', checked: true},
      {id: 3, name: '996', checked: false},
    ]
  }

  // 交给子组件 Header 调用，用于提交数据
  addItem = (todo) => {
    const {todos} = this.state
    this.setState({
      todos: [todo, ...todos]
    })
  }

  changeItem = (id, checked) => {
    const {todos} = this.state
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, checked}
      } else {
        return todo
      }
    })
    this.setState({
      todos: newTodos
    })
  }

  removeItem = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({
      todos: newTodos
    })
  }

  removeDone = () => {
    const {todos} = this.state
    const newTodos = todos.filter((todo) => {
      return !todo.checked
    })
    this.setState({
      todos: newTodos
    })
  }

  selectAll = (checked) => {
    const {todos} = this.state
    const newTodos = todos.map((todo) => {
      return {...todo, checked}
    })
    this.setState({
      todos: newTodos
    })
  }

  render() {
    const {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          {/* 通过 props 传递一个函数给子组件，从而获得子组件的数据 */}
          <Header addItem={this.addItem}/>
          <List todos={todos} changeItem={this.changeItem} removeItem={this.removeItem}/>
          <Footer todos={todos} removeDone={this.removeDone} selectAll={this.selectAll} />
        </div>
      </div>
    )
  }
}
