import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {

  static propTypes = {
    changeItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  }

  state = {
    mouseEnter: false
  }

  handleMouse = (flag) => {
    return () => {
      this.setState({mouseEnter: flag})
    }
  }

  changeItem = (id) => {
    return (event) => {
      this.props.changeItem(id, event.target.checked)
    }
  }

  handleRemove = (id) => {
    return () => {
      if (window.confirm('确定删除?')) {
        this.props.removeItem(id)
      }
    }
  }

  render() {
    const {id, name, checked} = this.props
    const {mouseEnter} = this.state
    return (
      <li style={{backgroundColor: mouseEnter ? '#ddd' : 'white'}} 
          onMouseEnter={this.handleMouse(true)} 
          onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" checked={checked} onChange={this.changeItem(id)}/>
          <span>{name}</span>
        </label>
        <button onClick={this.handleRemove(id)} className="btn btn-danger" style={{display: mouseEnter ? 'block' : 'none'}}>删除</button>
      </li>
    )
  }
}
