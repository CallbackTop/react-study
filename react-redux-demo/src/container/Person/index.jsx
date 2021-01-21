import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson} from '../../redux/actions/person'
import {nanoid} from 'nanoid'

class Person extends Component {

  state = {
    name: '',
    age: undefined
  }

  handleName = (event) => {
    const {value} = event.target
    this.setState({name: value})
  }

  handleAge = (event) => {
    const {value} = event.target
    this.setState({age: value * 1})
  }

  addPerson = () => {
    const {name, age} = this.state
    const person = {id: nanoid(), name, age}
    this.props.addPerson(person)
  }

  render() {
    return (
      <div>
        <h2>添加用户组件：</h2>
        <input onChange={this.handleName} type="text" placeholder="姓名"/>
        <input onChange={this.handleAge} type="text" placeholder="年龄"/>
        <button onClick={this.addPerson}>添加</button>
        <hr/>
        <h2>Count 当前求和结果为：{this.props.count}</h2>
        <hr/>
        <ul>
          {
            this.props.persons.map((p) => {
              return <li key={p.id}>{p.name} -- {p.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({persons: state.persons, count: state.count}),
  {
    addPerson: addPerson
  }
)(Person)
