import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    removeDone: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired
  }

  removeDone = () => {
    if (window.confirm('确定吗？')) {
      this.props.removeDone()
    }
  }

  selectAll = (checked) => {
    this.props.selectAll(checked)
  }

  render() {
    const {todos} = this.props
    const done = todos.filter((todo) => {
      return todo.checked
    }).length
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={todos.length === done && done !== 0} onChange={(event) => this.selectAll(event.target.checked)}/>
        </label>
        <span>
          <span>已完成{done}</span> / 全部{todos.length}
                </span>
        <button onClick={() => this.removeDone()} className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}
