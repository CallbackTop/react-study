import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Item from '../Item'
import './index.css'

export default class List extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    changeItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  }

  render() {
    const {todos, changeItem, removeItem} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map(todo => {
            return <Item key={todo.id} {...todo} changeItem={changeItem} removeItem={removeItem} />
          })
        }
      </ul>
    )
  }
}
