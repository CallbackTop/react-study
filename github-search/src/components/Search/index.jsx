import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

  search = () => {
    const {keywordNode: {value: keyword}} = this
    axios.get(`http://localhost:5000/api/search/users?q=${keyword}`).then(
      response => {
        console.log('success', response.data)
      },
      error => {
        console.log('error', error)
      }
    )
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => this.keywordNode = c} type="text" placeholder="enter the name you search"/>&nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
